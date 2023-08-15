const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const Category = require("../models/category");
const cloudinary = require("cloudinary");

// get categories
router.get(
  "/get-categories",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categories = await Category.find();
      return res.status(200).json({
        success: true,
        categories,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Add new category
router.post(
  "/create-category",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, image } = req.body;
      if (!name || !image) {
        return next(new ErrorHandler("All fields are required!", 400));
      }

      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        req.body.image,
        {
          folder: "categories",
        }
      );

      if (!public_id || !secure_url) {
        return next(
          new ErrorHandler("Error occured! Can not add category", 400)
        );
      }

      const category = req.body;
      category.image = {
        public_id,
        url: secure_url,
      };
      const new_category = await Category.create(category);
      if (!new_category) {
        return next(
          new ErrorHandler("Error occured! Can not add category", 400)
        );
      }

      return res.status(200).json({
        success: true,
        new_category,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete category
router.delete(
  "/delete-category/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return next(
          new ErrorHandler("Error occured! failed to delete a category", 400)
        );
      }

      await cloudinary.uploader.destroy(category.image.public_id);

      const deleted_category = await Category.findByIdAndDelete(req.params.id);

      if (!deleted_category) {
        return next(
          new ErrorHandler("Error occured! failed to delete a category", 400)
        );
      }

      return res.status(200).json({
        success: true,
        message: "category deleted successfuly",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Edit category
router.patch(
  "/edit-category",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    try {
      const { image } = req.body;
      const category = await Category.findById(req.body._id);

      if (image) {
        await cloudinary.uploader.destroy(category.image.public_id);

        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
          image,
          {
            folder: "categories",
          }
        );

        if (!public_id || !secure_url) {
          return next(
            new ErrorHandler("Error occured! Can not add category", 400)
          );
        }

        category.image = {
          public_id,
          url: secure_url,
        };
      }

      category.name = req.body.name;

      const updated_category = await category.save();

      if (!updated_category) {
        return next(
          new ErrorHandler("Error occured! failed to delete a category", 400)
        );
      }

      return res.status(200).json({
        success: true,
        updated_category,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
