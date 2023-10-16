const express = require("express");
const { isSeller } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const router = express.Router();
const Product = require("../models/products");
const { Order } = require("../models/orders");
const ErrorHandler = require("../helpers/ErrorHandler");

router.get(
  "/today-orders",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const specificDate = new Date("2023-10-16");

      // Set the start and end timestamps for the specific date
      const startOfDay = new Date(specificDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(specificDate);
      endOfDay.setHours(23, 59, 59, 999);
      endOfDay.toISOString()
      startOfDay.toISOString()
      console.log(endOfDay, startOfDay)
      // Use Mongoose aggregation to group orders by status and count the number of orders
      const result = await Order.aggregate([
        {
          $match: {
            updatedAt: { $gte: startOfDay, $lte: endOfDay },
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);
  
      // Create a response object
      const response = {};
  
      // Organize the results in the response object
      result.forEach((item) => {
        response[item._id] = item.count;
      });
  
      // Send the response as JSON
      res.json(response);
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
