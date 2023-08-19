const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User-v2",
  },
  region: {
    type: String,
    required: [true, "region is required to filled"],
  },
  city: {
    type: String,
    required: [true, "city is required to filled"],
  },
  address1: {
    type: String,
    required: [true, "address is required to filled"],
  },
  additional_address: {
    type: String,
    require: false,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  phone_number: {
    type: String,
    require: false,
  },
});

module.exports = mongoose.model("Address-v1", addressSchema);
