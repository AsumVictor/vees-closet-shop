const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// import controllers
const user = require("./controllers/user");
const payment = require("./controllers/payment");
const shop = require("./controllers/shop");
const product = require("./controllers/products");
const coupoun = require("./controllers/coupouns");
const Variation = require("./controllers/variations");
const category = require("./controllers/category");

// import router
app.use("/api/v1/user", user);
app.use("/api/v1/payment", payment);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/coupon", coupoun);
app.use("/api/v1/variation", Variation);
app.use("/api/v1/category", category);

app.use(ErrorHandler);
module.exports = app;
