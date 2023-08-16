const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const Product = require("../models/products");
const Category = require("../models/category");
const { Gender } = require("../models/variation");
// const Order = require("../models/");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../helpers/ErrorHandler");
const calculateSimilarity = require("../helpers/productSimilarity");

// get all products -- All
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// create product -- Only admin
router.post(
  "/create-product",
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!Array.isArray(req.body.images) || req.body.images.length === 0) {
        return next(
          new ErrorHandler("Cannot add product! Add at least one image", 400)
        );
      }

      const duplicate = await Product.findOne({ name: req.body.name });
      if (duplicate) {
        return next(
          new ErrorHandler(
            "Product already in stock. Group similar products with variations",
            400
          )
        );
      }

      const imagesLinks = await Promise.all(
        req.body.images.map(async (image) => {
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

// get a specific product
router.get(
  "/get-product/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!req.params.name) {
        return next(
          new ErrorHandler("Error occured! Product name required", 400)
        );
      }

      const product = await Product.findOne({ name: req.params.name });
      if (!product) {
        return next(
          new ErrorHandler(
            `Product with name ${req.params.name} not found`,
            400
          )
        );
      }
      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Search for products
router.get(
  "/search",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const searchTerm = req.query.term;

      if (!searchTerm) {
        return next(new ErrorHandler("Specifiy a product to search", 400));
      }

      const products = await Product.find({
        $or: [
          { name: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Search suggestions
router.get(
  "/search-suggestion",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const searchTerm = req.query.term;

      if (searchTerm.length >= 3) {
        const suggestions = await Product.find({
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        }).limit(5);

        return res.status(200).json({
          success: true,
          suggestions,
        });
      } else {
        return res.status(200).json({
          success: true,
          suggestions: [],
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Get all related products
router.get(
  "/related-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!req.query.id) {
        return next(
          new ErrorHandler(
            "Error occured fetch products. Specify a products to get its realted ones",
            400
          )
        );
      }

      const product = await Product.findById(req.query.id);

      const userInteractions = await Product.find({
        _id: { $ne: req.query.id },
        category: product.category,
        gender: product.gender,
      });

      const relatedProducts = userInteractions
        .map((interactionProduct) => ({
          product: interactionProduct,
          similarity: calculateSimilarity(product, interactionProduct),
        }))
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, 5);

      const relatedProductObjects = relatedProducts.map(
        (entry) => entry.product
      );

      return res.status(200).json({
        success: true,
        relatedProductObjects,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get featured products
router.get(
  "/featured-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const featured_products = await Product.find({ isFeatured: true });

      res.status(200).json({
        success: true,
        featured_products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get N number of new arrival
router.get(
  "/get-new-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      let limit = req.query.limit ? req.query.limit : 5;

      const products = await Product.find().sort({ createdAt: -1 });

      let Nth_new_products = products.slice(0, limit);
      res.status(200).json({
        success: true,
        products: Nth_new_products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Product by category
router.get(
  "/products-by-category",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const category_name = req.query.category;
      if (!category_name) {
        return next(new ErrorHandler("Specify the category name", 400));
      }

      let category = await Category.findOne({ name: category_name });

      if (!category) {
        return next(
          new ErrorHandler(`Category with name ${category_name} not found`, 400)
        );
      }
      const products = await Product.find({ category: category._id }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// Product by category
router.get(
  "/products-by-category",
  catchAsyncErrors(async (req, res, next) => {
    try {
      let products;
      const category_name = req.query.category;
      if (!category_name) {
        return next(new ErrorHandler("Specify the category name", 400));
      }
console.log(category_name)
      let category = await Category.findOne({ name: category_name });
      let gender = await Gender.findOne({ name: category_name });
console.log(category, gender)
      if (!category && !gender) {
        return next(
          new ErrorHandler(` Category with name ${category_name} not found. Specify 'men', 'women', 'dresses' , 'shirt' `, 400)
        );
      }

      if (category && !gender) {
        products = await Product.find({ category: category._id }).sort({
          createdAt: -1,
        });
      }

      if (gender && !category) {
        products = await Product.find({ gender: category._id }).sort({
          createdAt: -1,
        });
      }

      res.status(200).json({
        success: true,
        products,
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
