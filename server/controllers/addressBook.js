const express = require("express");
const User = require("../models/user");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const CatchAsyncError = require("../middleware/CatchAsyncErrors");
const { isAuthenticated } = require("../middleware/auth");

// Create an account
router.post(
  "/register",
  CatchAsyncError(async (req, res, next) => {
    try {
      const duplicate_user = await User.findOne({ email: req.body.email });

      if (duplicate_user) {
        return next(new ErrorHandler(`User already exist!`, 409));
      }

      const newUser = await User.create(req.body);
      if (newUser) {
         sendMail({
          from: "VEES CLOSET SHOP <victorasum31@gmail.com>",
          to: req.body.email,
          subject: "Email address verification",
          text: 'Verify your email',
          html: null,
        })
        sendToken(newUser, 200, res);
      }
    } catch (err) {
      return next(new ErrorHandler(`${err.message}`, 400));
    }
  })
);

// Login
router.post(
  "/auth",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide all credentails", 400));
      }

      let user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Incorrect email or password", 400));
      }

      const matchPassword = await user.comparePassword(password);

      if (!matchPassword) {
        return next(new ErrorHandler("Incorrect email or password", 400));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Logout
router.get(
  "/getuser",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(new ErrorHandler(`User doesn't exist in the system`, 400));
      }

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update user info
router.put(
  "/update-user-info",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phone_number = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(
        req.body.oldPassword
      );

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect!", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Password doesn't matched with each other!", 400)
        );
      }
      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Password updated successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
