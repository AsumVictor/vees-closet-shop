const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./controllers/user");
const payment = require("./controllers/payment");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://veescloset.onrender.com",
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

// import router
app.use("/api/vees/user", user);
app.use("/api/vees/payment", payment);

app.use(ErrorHandler);
module.exports = app;
