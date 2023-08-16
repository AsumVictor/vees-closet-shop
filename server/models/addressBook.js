const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
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
  }
});

module.exports = mongoose.model("Address-v1", addressSchema);
