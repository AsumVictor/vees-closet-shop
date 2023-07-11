const express = require("express");
const User = require("../models/user");
const router = express.Router();
const ErrorHandler = require("../helpers/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../helpers/sendMail");
const CatchAsyncError = require("../middleware/CatchAsyncErrors");
const sendToken = require("../helpers/jwtToken");

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
    console.log(userEmail)
    if (userEmail) {
      return next(new ErrorHandler("Email is already in use", 409));
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
    const activationURL = `http://localhost:5173/activation/${URLToken}`;
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

router.post("/activation", CatchAsyncError(async (req, res, next) => {
  try {
    const { activation_token } = req.body;
    const decodedToken = decodeToken(activation_token);
    const newUser = jwt.verify(decodedToken, process.env.ACTIVATION_TOKEN);
    if (!newUser) {
      return next(new ErrorHandler("Invalid token ", 400));
    }

    const { fullname, email, password, avatar } = newUser;
    User.create({
      fullname,
      email,
      password,
      avatar,
    });
    sendToken(newUser, 200, res);
  } catch (err) {
    return next(new ErrorHandler(`${err.message}`, 400));
  }
}))

module.exports = router;
