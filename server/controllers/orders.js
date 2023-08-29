const express = require("express");
const User = require("../models/user");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../models/coupounCode.js");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
const { OrderItem, Order } = require("../models/orders");

// create order --- already user
router.post(
  "/place-order",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { shipping_address, items, payment_number, coupon, delivery_cost } =
        req.body;
      if (!delivery_cost || !payment_number) {
        return next(
          new ErrorHandler("Error: Provide all neccessary information", 400)
        );
      }
      let discount = coupon ? coupon : 0;
      const totalCost = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const net_cost = Number(
        (totalCost + delivery_cost - discount).toFixed(2)
      );

      const orderItems = await Promise.all(
        items.map(async (item) => {
          const { _id } = await OrderItem.create(item);
          return _id;
        })
      );

      let { _id } = await Order.create({
        shipping_address,
        user: req.user.id,
        total_price: net_cost,
        items: orderItems,
      });

      res.status(201).json({
        success: true,
        message: `Order placed with ID: ${_id}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update order status -- user
router.post(
  "/update-status-user",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { _id, status } = req.body;
      if (!status || !_id) {
        return next(
          new ErrorHandler(
            "Error: Provide all neccessary information to update order status",
            400
          )
        );
      }

      const product = await Order.findById(_id);
      if (!product) {
        return next(new ErrorHandler("Invalid response ", 404));
      }

      product.status = status;
      let { _id: updated_id } = await product.save();

      if (!updated_id) {
        return next(
          new ErrorHandler("Order status could not saved! Try again", 404)
        );
      }

      res.status(201).json({
        success: true,
        message: `Order status has been updated to ${status}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update order status -- shop owner
router.post(
  "/update-status-shop",
  isSeller,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { _id, status } = req.body;
      if (!status || !_id) {
        return next(
          new ErrorHandler(
            "Error: Provide all neccessary information to update order status",
            400
          )
        );
      }

      const product = await Order.findById(_id);
      if (!product) {
        return next(new ErrorHandler("Invalid response ", 404));
      }

      product.status = status;
      let { _id: updated_id } = await product.save();

      if (!updated_id) {
        return next(
          new ErrorHandler("Order status could not saved! Try again", 404)
        );
      }

      res.status(201).json({
        success: true,
        message: `Order status has been updated to ${status}`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all orders
router.get(
  "/get-orders",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find();

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// get a specific order
router.get(
  "/get-orders/:id",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      if (!req.params.id) {
        return next(
          new ErrorHandler("Provide an id to get a specific order", 400)
        );
      }

      const order = await Order.findById(req.params.id)
        .populate({
          path: "user",
          select: "first_name last_name email", // Specify the fields you want
        })
        .populate({
          path: "items",
          populate: {
            path: "product",
            model: "product-v2",
          },
        });

      if (!order) {
        return next(
          new ErrorHandler(`Order with id - ${req.params.id} not found`, 400)
        );
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// get order with user ID
router.get(
  "/get-user-orders",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.user.id });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// get order with specific status -- shop owner
router.get(
  "/get-orders-status",
  isSeller,
  CatchAsyncError(async (req, res, next) => {
    try {
      const orders = await Order.find({status: req.body.status});

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);
// get order between with status between date

// Mock payment

module.exports = router;
