const express = require("express");
const catchAsyncErrors = require("../middleware/CatchAsyncErrors");
const ErrorHandler = require("../helpers/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../models/coupounCode.js");
const Product = require("../models/products");
const deepEqual = require("../helpers/deepObjectCompare");
const router = express.Router();

router.post(
  "/add-to-cart",
  catchAsyncErrors(async (req, res, next) => {
    try {
      if (!req.session.cart) {
        req.session.cart = [];
      }

      const { _id, qty, variation } = req.body;
      if (!_id || !qty) {
        return next(
          new ErrorHandler("Provide product_id and quatity to be added", 400)
        );
      }

      const product = await Product.findById(_id);

      if (!product) {
        return next(new ErrorHandler("Invalid product id", 400));
      }

      let item = {
        _id,
        qty,
      };
      variation && (item.variation = variation);

      const foundItem = req.session.cart.find((item) => {
        if (item._id === _id) {
          if (variation) {
            return deepEqual(item.variation, variation);
          }
          return true;
        }
        return false;
      });

      if (foundItem) {
        let index = req.session.cart.indexOf(foundItem);
        req.session.cart[index] = {
          ...req.session.cart[index],
          qty,
        };
      }

      if (!foundItem) {
        req.session.cart.push(item);
      }
      res.status(201).json({
        success: true,
        message: "Item added to cart successfuly",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  "/get-cart",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const cart = req.session.cart || [];
      let cartItems = await Promise.all(
        cart.map(async (item) => {
          let productItem = await Product.findById(item._id);
          if (productItem) {
            let { variation } = item;
            let basePrice = productItem.base_price && productItem.base_price;
            return {
              _id: productItem._id,
              name: productItem.name,
              base_price: basePrice,
              actual_price: productItem.actual_price,
              images: productItem.images,
              variation,
              qty: item.qty,
            };
          }
        })
      );

      res.status(201).json({
        success: true,
        cart: cartItems,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.post(
  "/remove-from-cart",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { _id, variation } = req.body;
      if (!_id) {
        return next(
          new ErrorHandler("Provide product_id and to be removed", 400)
        );
      }

      let new_cart_data = req.session.cart?.filter((item) => {
        if (item._id !== _id) {
          return true;
        } else {
          if (
            variation === null ||
            JSON.stringify(item.variation) !== JSON.stringify(variation)
          ) {
            return true;
          }
        }
        return false;
      });

      req.session.cart = new_cart_data;
      res.status(201).json({
        success: true,
        cart: req.session.cart,
        message: "Item removed from cart successfuly",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
