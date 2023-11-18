const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const Product = require("../models/products");
const { Order } = require("../models/orders");
const ErrorHandler = require("../helpers/ErrorHandler");
const { dailySales, currentWeekSales, currentMonthSales } = require("../analytics/queries");

router.get(
  "/today-sales",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let sales = await Order.aggregate(dailySales);
      res.status(200).json({
        success: true,
        sales: sales.length === 0 ? 0.00 : sales[0].dailySales,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/week-sales",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let sales = await Order.aggregate(currentWeekSales);

      res.status(200).json({
        success: true,
        sales: sales.length === 0 ? 0.00 : Number(sales[0].weekSales.toFixed(2)),
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/monthly-sales",
   isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      let sales = await Order.aggregate(currentMonthSales);
       
      res.status(200).json({
        success: true,
        sales: sales.length === 0 ? 0.00 : Number(sales[0].monthlySales.toFixed(2)),
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


module.exports = router;
