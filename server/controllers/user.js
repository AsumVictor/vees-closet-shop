const express = require("express");
const User = require("../models/user");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendMail");
const CatchAsyncError = require("../middleware/CatchAsyncErrors");
const sendToken = require("../helpers/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

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

router.post("/create-user", async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return next(new ErrorHandler(`User already exist in the system`, 400));
    }

    const user = {
      fullname,
      email,
      password,
      avatar: {
        public_id: null,
        url: "https://scai.kibu.ac.ke/wp-content/uploads/2021/10/NoProfile.png",
      },
    };

    const activationToken = createActivationToken(user);
    const URLToken = encodeToken(activationToken);
    const activationURL = `https://veescloset.onrender.com/activation/${URLToken}`;
    try {
      await sendMail({
        email: email,
        subject: "Activation your Vees account",
        message: `Hello ${user.fullname}!, we are glad to welcome you. Please take a minute to activate your account. Click on ${activationURL} `,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email:-${user.email} to activate your account`,
      });
    } catch (err) {
      return next(new ErrorHandler(`${err.message}`, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(`${err.message}`, 400));
  }
});

router.post(
  "/activation",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const decodedToken = decodeToken(activation_token);
      const newUser = jwt.verify(decodedToken, process.env.ACTIVATION_TOKEN);
      if (!newUser) {
        return next(new ErrorHandler("Invalid token ", 400));
      }

      const { fullname, email, password, avatar } = newUser;

      // check duplicate
      let foundUser = await User.findOne({ email });
      if (foundUser) {
        return next(new ErrorHandler("User already exist", 409));
      }

      let user = await User.create({
        fullname,
        email,
        password,
        avatar,
      });
      sendToken(user, 200, res);
    } catch (err) {
      return next(new ErrorHandler(`${err.message}`, 400));
    }
  })
);

router.post(
  "/auth0",
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

// log out user
router.get(
  "/logout",
  CatchAsyncError(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user addresses
router.put(
  "/update-user-addresses",
  isAuthenticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );
      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        // add the new address to the array
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
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
      user.phoneNumber = phoneNumber;

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

module.exports = router;
