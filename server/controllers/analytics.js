const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const Product = require("../models/products");
const { Order } = require("../models/orders");
const ErrorHandler = require("../helpers/ErrorHandler");
const { dailySales, currentWeekSales } = require("../analytics/queries");

router.get(
  "/today-sales",
  // isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let sales = await Order.aggregate(currentWeekSales);

      res.status(200).json({
        success: true,
        sales,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
