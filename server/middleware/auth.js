const ErrorHandler = require("../helpers/ErrorHandler");
const CatchAsyncErrors = require("./CatchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticated = CatchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please you must login first", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
