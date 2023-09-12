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
      const couponCodes = await CoupounCode.find().sort({ createdAt: -1 });
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
  "/get-coupon-value/:code",
  catchAsyncErrors(async (req, res, next) => {
    try {
      let value = null;
      const price = req.query.price;
      if (!price) {
        return next(new ErrorHandler("Price must be included", 400));
      }

      const couponCode = await CoupounCode.findOne({ code: req.params.code });

      if (!couponCode) {
        return next(new ErrorHandler("Invalid coupoun code", 400));
      }

      // expires coupoun
      if (
        couponCode.expirationDate &&
        couponCode.expirationDate.toISOString() < new Date().toISOString()
      ) {
        return next(new ErrorHandler("Coupoun has expired", 400));
      }

      // check for min value of coupon
      if (couponCode.minimumAmount && couponCode.minimumAmount > price) {
        return next(
          new ErrorHandler(
            `Coupon applies only if total cost is more than GH₵ ${couponCode.minimumAmount.toFixed(
              2
            )}`,
            400
          )
        );
      }

      if (couponCode.maximumAmount && couponCode.maximumAmount < price) {
        return next(
          new ErrorHandler(
            `Coupon applies only if total cost is less than GH₵ ${couponCode.maximumAmount.toFixed(
              2
            )}`,
            400
          )
        );
      }

      if (couponCode.discountType === "percentage") {
        value = (Number(couponCode.discountValue) * Number(price)) / 100;
      } else {
        value = couponCode.discountValue;
      }

      res.status(200).json({
        success: true,
        code: couponCode.code,
        value,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
