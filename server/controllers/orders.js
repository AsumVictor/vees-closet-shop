const express = require("express");
const User = require("../models/user");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../models/coupounCode.js");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");
const { OrderItem, Order } = require("../models/orders");
const getTrackingID = require("../helpers/getTrackingID");
const generateStrongPassword = require("../helpers/getRandomPassword");
const sendMail = require("../helpers/sendMail");
const { format } = require("date-fns");

// create order --- already user
// guest-place-order

const createOrder = async (data) => {
  try {
    const { user_id, email, order_details } = data;
    const totalCost = order_details.items.reduce(
      (sum, product) => sum + Number(product.cost),
      0
    );
    const coupon = await CoupounCode.findOne({ code: order_details.coupon });
    let discount = 0;
    if (coupon) {
      discount =
        coupon.discountType === "percentage"
          ? (coupon.discountValue * totalCost) / 100
          : coupon.discountValue;
    }

    const net_cost = Number(
      totalCost + order_details.shipping_cost - Number(discount.toFixed(2))
    );
    const orderItems = await Promise.all(
      order_details.items.map(async (item) => {
        const { _id } = await OrderItem.create({
          product: item._id,
          quantity: item.qty,
          unitPrice: item.actual_price,
          totalPrice: item.cost,
          variation_choice: item.variation_choice ? item.variation_choice : {},
        });
        return _id;
      })
    );

    let order = await Order.create({
      shipping_address: order_details.shipping_address,
      user: user_id,
      tracking_no: await getTrackingID(),
      charges: {
        coupon: order_details.coupon,
        discount,
        shipping_cost: order_details.shipping_cost,
        items_cost: totalCost,
      },
      total_price: net_cost,
      items: orderItems,
      paymentInfo: order_details.paymentInfo,
    });

     sendMail({
      from: "VEES CLOSET SHOP <victorasum31@gmail.com>",
      to: email,
      subject: "Confirm your order",
      text: "Make payment to confirm your order",
      html: null,
    });

    return {
      success: true,
      order,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Place order for already user
router.post(
  "/place-order",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { shipping_address, paymentInfo, items, coupon, shipping_cost } =
        req.body;

      let response = await createOrder({
        user_id: req.user._id,
        email: req.user.email,
        order_details: {
          shipping_address,
          coupon,
          shipping_cost,
          paymentInfo,
          items,
        },
      });

      if (response.success) {
        req.session.cart = [];
      }

      res.status(201).json({
        success: true,
        order: response.order.tracking_no,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Guest checkout
router.post(
  "/guest-place-order",
  CatchAsyncError(async (req, res, next) => {
    try {
      const {
        userDetails,
        shipping_address,
        paymentInfo,
        items,
        coupon,
        shipping_cost,
      } = req.body;

      const duplicate_user = await User.findOne({ email: userDetails.email });

      if (duplicate_user) {
        return next(
          new ErrorHandler(
            `Email aready exist. Try logging in to place your order`,
            409
          )
        );
      }
      const { _id, email } = await User.create({
        ...userDetails,
        password: generateStrongPassword(),
      });

      let order = await createOrder({
        user_id: _id,
        email: email,
        order_details: {
          shipping_address,
          coupon,
          shipping_cost,
          paymentInfo,
          items,
        },
      });
      if (order.success) {
        req.session.cart = [];
      }

      res.status(201).json({
        success: true,
        order: order.order.tracking_no,
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
// get a specific order --user
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

      const order = await Order.findById(
        req.params.id,
        "charges items paymentInfo shipping_address  status total_price tracking_no createdAt"
      ).populate({
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
      const page = Number(req.query.page) || 1;
      const limit = 20;
      const sortType = req.query.sort;
      let sortOptions = { user: req.user._id };

      let status = [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "refund",
        "cancelled",
      ];

      status.forEach((status) => {
        if (sortType === status) {
          sortOptions = { ...sortOptions, status: status };
        }
      });

      const totalCount = await Order.countDocuments(sortOptions);
      const totalPages = Math.ceil(totalCount / limit);

      const response = await Order.find(
        sortOptions,
        "status tracking_no items createdAt "
      )
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      let orders = response.map((order) => {
        const date = new Date(order.createdAt);
        const formattedDate = format(date, "MMM d yyyy");

        return {
          _id: order._id,
          status: order.status,
          tracking_no: order.tracking_no,
          items: order.items.length,
          date: formattedDate,
        };
      });

      res.status(200).json({
        success: true,
        orders,
        totalPages,
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
      const orders = await Order.find({ status: req.body.status });

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
