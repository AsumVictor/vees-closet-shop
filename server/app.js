const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
let origin;
if (process.env.NODE_ENV !== "PRODUCTION") {
  origin = "http://localhost:5173";
} else {
  origin = "https://veescloset.onrender.com";
}

app.use(
  cors({
    origin: origin,
    credentials: true
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

const mongoStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  mongooseConnection: mongoose.connection,
  collection: "cart",
});

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
      expires: null,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

// import controllers
const user = require("./controllers/user");
const shop = require("./controllers/shop");
const product = require("./controllers/products");
const coupoun = require("./controllers/coupouns");
const Variation = require("./controllers/variations");
const category = require("./controllers/category");
const cart = require("./controllers/shopppingCart");
const order = require("./controllers/orders");
const analytics = require("./controllers/analytics");

// import router
app.use("/api/v1/user", user);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/coupon", coupoun);
app.use("/api/v1/variation", Variation);
app.use("/api/v1/category", category);
app.use("/api/v1/cart", cart);
app.use("/api/v1/order", order);
app.use("/api/v1/analytics", analytics);

app.use(ErrorHandler);
module.exports = app;
