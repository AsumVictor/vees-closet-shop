const express = require("express");
const User = require("../models/user");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendMail");
const CatchAsyncError = require("../middleware/CatchAsyncErrors");
const sendToken = require("../helpers/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const AddressBook = require("../models/addressBook");
const isStrongPassword = require("../helpers/isStrongPassword");
const user = require("../models/user");
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN, {
    expiresIn: "5m",
  });
};

const encodeToken = (token) => {
  const placeholder = "VerifyVees";
  const encodedToken = token.replace(/\./g, placeholder);

  return encodedToken;
};

const decodeToken = (token) => {
  const placeholder = "VerifyVees";
  const decodedToken = token.replace(new RegExp(placeholder, "g"), ".");
  return decodedToken;
};

// Create an account
router.post(
  "/register",
  CatchAsyncError(async (req, res, next) => {
    try {
      const duplicate_user = await User.findOne({ email: req.body.email });

      if (duplicate_user) {
        return next(new ErrorHandler(`User already exist!`, 409));
      }

      if (!isStrongPassword(req.body.password)) {
        return next(
          new ErrorHandler(
            `Provide a strong password. contains min Length : 8, Uppercase, Lowecase & symbol `,
            400
          )
        );
      }

      const newUser = await User.create(req.body);
      if (newUser) {
        sendMail({
          from: "VEES CLOSET SHOP <victorasum31@gmail.com>",
          to: req.body.email,
          subject: "Email address verification",
          text: "Verify your email",
          html: null,
        });
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

// get user
router.get(
  "/getuser",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate("addresses");
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

// Addresses
// create address
// Edit address
// Delete address
router.post(
  "/add-address",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(
          new ErrorHandler(
            `User does not exist. Login or create an account`,
            400
          )
        );
      }

      let address = req.body;
      if (user.addresses.length === 0) {
        address.isDefault = true;
      }

      const new_address = await AddressBook.create({
        user: user._id,
        ...address,
      });
      user.addresses.push(new_address._id);
      await user.save();
      res.status(201).json({
        success: true,
        address: new_address,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// change default
router.post(
  "/address-change-default",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return next(
          new ErrorHandler(
            `User does not exist. Login or create an account`,
            400
          )
        );
      }

      const address = await AddressBook.findById(req.body.id);
      if (!address) {
        return next(new ErrorHandler(`Provide valid address id`, 400));
      }

      const oldDefault = await AddressBook.findOne({
        user: user._id,
        isDefault: true,
      });

      oldDefault &&
        (await AddressBook.findByIdAndUpdate(oldDefault._id, {
          isDefault: false,
        }));

      address.isDefault = true;
      await address.save();
      res.status(201).json({
        success: true,
        address,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update address
router.patch(
  "/update-address",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      if (!req.body._id) {
        return next(
          new ErrorHandler(
            "Id of the address is required in order to modify",
            400
          )
        );
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const address = await AddressBook.findById(req.body._id);

      if (!address) {
        return next(new ErrorHandler("Address not found", 400));
      }

      address.region = req.body.region;
      address.city = req.body.city;
      address.address1 = req.body.address1;
      address.additional_address = req.body.additional_address;

      let updated_address = await address.save();

      res.status(201).json({
        success: true,
        address: updated_address,
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

      if (!isStrongPassword(req.body.newPassword)) {
        return next(
          new ErrorHandler(
            `Provide a strong password. contains min Length : 8, Uppercase, Lowecase & symbol `,
            400
          )
        );
      }

      if (req.body.newPassword.trim() !== req.body.confirmPassword.trim()) {
        return next(
          new ErrorHandler("New password doesn't matched with each other!", 400)
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

// update user info
router.put(
  "/update-info",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      if (req.body.firstName.trim() === "" || req.body.lastName.trim() === "") {
        return next(new ErrorHandler("All fields are required", 400));
      }
      const user = await User.findById(req.user.id);

      user.first_name = req.body.firstName;
      user.last_name = req.body.lastName;

      await user.save();

      res.status(200).json({
        success: true,
        message: "Changes saved successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Email verify request
router.put(
  "/email-verify-req",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      await sendMail({
        from: "VEES CLOSET SHOP <victorasum31@gmail.com>",
        to: user.email,
        subject: "Email address verification",
        text: "Verify your email",
        html: null,
      });

      res.status(200).json({
        success: true,
        message: `Please check your email-${user.email} for verification link`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
