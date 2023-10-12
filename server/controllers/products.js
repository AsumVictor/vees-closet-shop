const express = require("express");
const { isSeller, isAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const Product = require("../models/products");
const Category = require("../models/category");
const { Gender } = require("../models/variation");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../helpers/ErrorHandler");
const calculateSimilarity = require("../helpers/productSimilarity");

// get all products -- All
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = 12;
      const sortType = req.query.sort;
      let sortOptions = {};

      if (sortType === "popularity") {
        sortOptions = { qty_in_stock: -1 };
      } else if (sortType === "price_asc") {
        sortOptions = { actual_price: 1 };
      } else if (sortType === "price_desc") {
        sortOptions = { actual_price: -1 };
      } else {
        sortOptions = { createdAt: -1 };
      }

      const totalCount = await Product.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);

      const products = await Product.find(
        {},
        "name images actual_price base_price qty_in_stock"
      )
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

      res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products -- Admin
router.get(
  "/get-products",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const searchTerm = req.query.q;
      const sortType = req.query.sort;
      let sortOptions = {};

      if (sortType === "recent_update") {
        sortOptions = { updatedAt: -1 };
      } else if (sortType === "price_desc") {
        sortOptions = { actual_price: -1 };
      } else if (sortType === "price_asc") {
        sortOptions = { actual_price: 1 };
      } else if (sortType === "newest") {
        sortOptions = { createdAt: -1 };
      } else if (sortType === "oldest") {
        sortOptions = { createdAt: 1 };
      } else if (sortType === "stock_asc") {
        sortOptions = { qty_in_stock: -1 };
      } else if (sortType === "stock_desc") {
        sortOptions = { qty_in_stock: 1 };
      } else if (sortType === "name_asc") {
        sortOptions = { name: -1 };
      } else if (sortType === "name_desc") {
        sortOptions = { name: 1 };
      } else {
        sortOptions = { createdAt: -1 };
      }

      const totalCount = await Product.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);
      let params;
      if (searchTerm) {
        params = {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        };
      } else {
        params = {};
      }

      const products = await Product.find(
        params,
        "name images actual_price qty_in_stock createdAt updatedAt "
      )
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

      res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// create product -- Only admin
router.post(
  "/create-product",
  isSeller,
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

      const product = await Product.findOne({ name: req.params.name }).populate(
        {
          path: "variations.variation",
          select: "name",
        }
      );
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

// get a specific product -- admin
router.get(
  "/get-product-ebece57326214432/:_id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!req.params._id) {
        return next(
          new ErrorHandler("Error occured! Product _id required", 400)
        );
      }

      const product = await Product.findOne({ _id: req.params._id })
        .populate({
          path: "variations.variation",
          select: "name",
        })
        .populate("gender category");
      if (!product) {
        return next(
          new ErrorHandler(`Product with _id ${req.params._id} not found`, 400)
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

// update product -- admin
router.put(
  "/update-product/:_id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { data, field } = req.body;
    try {
      if (!req.params._id) {
        return next(
          new ErrorHandler("Error occured! Product _id required", 400)
        );
      }

      if (!field) {
        return next(
          new ErrorHandler("Error occured! Specify field to be updated", 400)
        );
      }

      if (!data) {
        return next(
          new ErrorHandler(
            "Error occured! product information cannot empty",
            400
          )
        );
      }

      let product = await Product.findOneAndUpdate(
        { _id: req.params._id },
        { [field]: data },
        { new: true }
      );

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update product image -- admin
router.delete(
  "/delete-product-image/:_id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { _id } = req.query;

    try {
      if (!req.params._id) {
        return next(
          new ErrorHandler("Error occured! Product _id required", 400)
        );
      }

      if (!_id) {
        return next(
          new ErrorHandler(
            "Error occured! Specify image _id to be deleted",
            400
          )
        );
      }

      let product = await Product.findById(req.params._id);

      let images = product.images.filter((i) => i._id.toString() !== _id);

      cloudinary.uploader.destroy(req.query.ref);

      product.images = images;

      await product.save();

      res.status(200).json({
        success: true,
        images,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// update product image new-- Only admin
router.put(
  "/update-product-image-new/:_id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params._id);
      const images = product.images;

      const imagesLinks = await Promise.all(
        req.body.images.map(async (image) => {
          const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
            image,
            {
              folder: "products",
            }
          );
          images.push({ public_id, url: secure_url });
          return { public_id, url: secure_url };
        })
      );

      product.images = images;
      await product.save();

      res.status(201).json({
        success: true,
        images,
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
      const searchTerm = req.query.q;

      if (!searchTerm) {
        return next(new ErrorHandler("Specifiy a product to search", 400));
      }
      const page = Number(req.query.page) || 1;
      const limit = 12;
      const sortType = req.query.sort;
      let sortOptions = {};

      if (sortType === "popularity") {
        sortOptions = { qty_in_stock: -1 };
      } else if (sortType === "price_asc") {
        sortOptions = { actual_price: 1 };
      } else if (sortType === "price_desc") {
        sortOptions = { actual_price: -1 };
      } else {
        sortOptions = { createdAt: -1 };
      }

      const totalCount = await Product.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);

      const products = await Product.find(
        {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { description: { $regex: searchTerm, $options: "i" } },
          ],
        },
        "name images actual_price base_price qty_in_stock"
      )
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);

      res.status(200).json({
        success: true,
        products,
        totalPages,
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
      const searchTerm = req.query.q;

      if (searchTerm.length >= 3) {
        const suggestions = await Product.find(
          {
            $or: [
              { name: { $regex: searchTerm, $options: "i" } },
              { description: { $regex: searchTerm, $options: "i" } },
            ],
          },
          "name images"
        ).limit(5);

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
      if (!req.query.name) {
        return next(
          new ErrorHandler(
            "Error occured fetch products. Specify a products to get its realted ones",
            400
          )
        );
      }

      const product = await Product.findOne({ name: req.query.name });

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

      const relatedProductObjects = relatedProducts.map((entry) => {
        return {
          name: entry.product.name,
          actual_price: entry.product.actual_price,
          images: entry.product.images,
          base_price: entry.product.base_price
            ? entry.product.base_price
            : null,
        };
      });

      return res.status(200).json({
        success: true,
        products: relatedProductObjects,
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
      let products;
      const category_name = req.query.category;
      if (!category_name) {
        return next(new ErrorHandler("Specify the category name", 400));
      }
      let category = await Category.findOne({ name: category_name });

      const page = Number(req.query.page) || 1;
      const limit = 12;
      const sortType = req.query.sort;
      let sortOptions = {};

      if (sortType === "popularity") {
        sortOptions = { qty_in_stock: -1 };
      } else if (sortType === "price_asc") {
        sortOptions = { actual_price: 1 };
      } else if (sortType === "price_desc") {
        sortOptions = { actual_price: -1 };
      } else {
        sortOptions = { createdAt: -1 };
      }

      const totalCount = await Product.countDocuments({});
      const totalPages = Math.ceil(totalCount / limit);

      if (category) {
        products = await Product.find(
          { category: category._id },
          "name images actual_price base_price qty_in_stock"
        )
          .sort(sortOptions)
          .skip((page - 1) * limit)
          .limit(limit);
      } else {
        products = await Product.find(
          { gender: category_name },
          "name images actual_price base_price qty_in_stock"
        )
          .sort(sortOptions)
          .skip((page - 1) * limit)
          .limit(limit);
      }

      if(!products){
        return next(new ErrorHandler('Error occured getting products! Try again', 400));
      }

      res.status(200).json({
        success: true,
        products,
        totalPages,
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

// // review for a product
// router.put(
//   "/create-new-review",
//   isAuthenticated,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const { user, rating, comment, productId, orderId } = req.body;

//       const product = await Product.findById(productId);

//       const review = {
//         user,
//         rating,
//         comment,
//         productId,
//       };

//       const isReviewed = product.reviews.find(
//         (rev) => rev.user._id === req.user._id
//       );

//       if (isReviewed) {
//         product.reviews.forEach((rev) => {
//           if (rev.user._id === req.user._id) {
//             (rev.rating = rating), (rev.comment = comment), (rev.user = user);
//           }
//         });
//       } else {
//         product.reviews.push(review);
//       }

//       let avg = 0;

//       product.reviews.forEach((rev) => {
//         avg += rev.rating;
//       });

//       product.ratings = avg / product.reviews.length;

//       await product.save({ validateBeforeSave: false });

//       await Order.findByIdAndUpdate(
//         orderId,
//         { $set: { "cart.$[elem].isReviewed": true } },
//         { arrayFilters: [{ "elem._id": productId }], new: true }
//       );

//       res.status(200).json({
//         success: true,
//         message: "Reviwed succesfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

module.exports = router;
