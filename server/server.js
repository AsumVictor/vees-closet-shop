const app = require("./app");
const connectDb = require('./db/Database')
// handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down server`);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

connectDb()

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on https://localhost:${process.env.PORT}`);
});

// Unhandle promises
process.on("onhandleRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
