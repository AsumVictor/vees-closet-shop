const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your product name!"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter your product description!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please enter your product category!"],
    },
    variation: [
      {
        name: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variation",
        },
        values: [
          {
            type: String,
          },
        ],
      },
    ],
    gender: {
      type: mongoose.Schema.ObjectId,
      required: [true, "Please slect gender type for this product!"],
    },
    default_price: {
      type: Number,
    },
    actual_price: {
      type: Number,
      required: [true, "Please enter your product price!"],
    },
    product_stock: {
      type: Number,
      required: [true, "Please enter your product stock!"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Product", productSchema);
