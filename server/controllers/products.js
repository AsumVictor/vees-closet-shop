const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const Product = require("../models/products");
// const Order = require("../models/");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../helpers/ErrorHandler");

// create product
router.post(
  "/create-product",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let images = [];
      images = req.body.images;

      const imagesLinks = await Promise.all(
        images.map(async (image) => {
          const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
            image,
            {
              folder: "products",
            }
          );

          return { public_id, url: secure_url };
        })
      );

      const productData = req.body;
      const product = await Product.create({
        ...productData,
        images: imagesLinks,
      });

      res.status(201).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }
      
      for (const image of product.images) {
        const { public_id } = image;
        await cloudinary.uploader.destroy(public_id);
      }
  
      const deletedProduct = await product.deleteOne();

      if (deletedProduct) {
        res.status(201).json({
          success: true,
          message: "Product Deleted successfully!",
        });
      } else {
        return next(
          new ErrorHandler("Opps! Error occured deleting product", 400)
        );
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
