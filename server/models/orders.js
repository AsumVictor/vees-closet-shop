const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "You must be authenticate as user before placing order"],
      ref: "User-v2",
    },
    shipping_address: {
      address1: {
        type: String,
        required: [true, "Provide shipping address line 1 for the order"],
      },
      address2: {
        type: String,
      },
      region: {
        type: String,
        required: [true, "Provide shipping region for the order"],
      },
      location: {
        type: String,
        required: [true, "Provide shipping city for the order"],
      },
      phone_number: {
        type: String,
        required: [true, "Provide phone number for the order"],
      },
    },
    status: {
      type: String,
      default: "pending",
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "refund",
        "cancelled",
      ],
    },
    tracking_no: {
      type: String,
      required: true
    },
    total_price: {
      type: Number,
      default: 0,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order-Item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product-v2", // Reference to the Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    variation_choice: {},
  },
  { timestamps: true }
);


// userSchema.pre("save", async function (next) {
  

//   this.password = await bcrypt.hash(this.password, 10);
// });

const OrderItem = mongoose.model("Order-Item", orderItemSchema);
const Order = mongoose.model("Order", OrderSchema);

module.exports = {
  Order,
  OrderItem,
};
