const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const { Gender, Variations } = require("../models/variation");

// get genders
router.get(
  "/get-gender",
  catchAsyncErrors(async (req, res) => {
    try {
      const genders = await Gender.find();
      return res.status(200).json({
        success: true,
        genders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// add new gender
router.post(
  "/create-gender",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const gender = await Gender.create(req.body);
      if (!gender) {
        return next(new ErrorHandler("Error occured creating gender", 400));
      }
      return res.status(200).json({
        success: true,
        gender,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get variations
router.get(
  "/get-variations",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const variations = await Variations.find();
      return res.status(200).json({
        success: true,
        variations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Add varaiations
router.post(
  "/create-variation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const variations = await Variations.create(req.body);
      if (!variations) {
        return next(new ErrorHandler("Error occured creating variations", 400));
      }
      return res.status(200).json({
        success: true,
        variations,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// edit varaiations
router.patch(
  "/edit-variation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const variation = await Variations.findById(req.body._id);
      if (!variation) {
        return next(new ErrorHandler("Error occured! No variation found", 400));
      }

      variation.name = req.body.name;
      variation.values = req.body.values;
      let updated_variation = await variation.save();
      return res.status(200).json({
        success: true,
        updated_variation,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Delete one variation
router.delete(
  "/delete-variation/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const variation = await Variations.findByIdAndDelete(req.params.id);
      if (!variation) {
        return next(
          new ErrorHandler("Error occured! failed to delete variation", 400)
        );
      }
      return res.status(200).json({
        success: true,
        message: "Item deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
