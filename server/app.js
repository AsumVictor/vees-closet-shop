const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
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

// import router
app.use("/api/vees/user", user);
app.use("/api/vees/payment", payment);
app.use("/api/vees/shop", shop);
app.use("/api/vees/product", product);

app.use(ErrorHandler);
module.exports = app;
