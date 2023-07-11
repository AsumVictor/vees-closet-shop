const mongoose = require("mongoose");

const connectTODB = () => {
  mongoose.connect(process.env.DATABASE_URL).then((data) => {
    console.log(`Mongodb connected with server ${data.connection.host}`);
  });
};

module.exports = connectTODB