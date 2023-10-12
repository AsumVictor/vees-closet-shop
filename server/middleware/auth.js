const ErrorHandler = require("../helpers/ErrorHandler");
const CatchAsyncErrors = require("./CatchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Shop = require("../models/shop");

exports.isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  const  token  = req.cookies.x_user_auth_v1;
  if (!token) {
    return next(new ErrorHandler("Please you must login first", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});

exports.isSeller = CatchAsyncErrors(async (req, res, next) => {
  const { _v_ } = req.cookies;
  if (!_v_) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(_v_, process.env.JWT_SECRET_KEY);

  req.seller = await Shop.findById(decoded.id);

  next();
});
