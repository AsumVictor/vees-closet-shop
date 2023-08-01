const express = require("express");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const ErrorHandler = require("../helpers/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../models/coupounCode.js");
const router = express.Router();

// create coupoun code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await CoupounCode.findOne({
        code: req.body.code,
      });

      if (isCoupounCodeExists) {
        return next(new ErrorHandler("Coupoun code already exists!", 409));
      }

      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons
router.get(
  "/get-coupon",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find().sort({createdAt: -1});
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }

      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Check if coupoun exist
      // Check if check expiring data

      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      if (!couponCode) {
        return next(new ErrorHandler("Invalid coupoun code", 400));
      }

      let currentDate = new Date();

      // expires coupoun
      if (currentDate > couponCode.expirationDate) {
        return next(new ErrorHandler("Coupoun has expired", 400));
      }

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
