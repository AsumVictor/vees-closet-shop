const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      unique: [
        true,
        "Product name must be unique. Group similar products with variations",
      ],
    },
    description: {
      type: String,
      required: [true, "Product description is required!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Select a category for the product!"],
    },
    hasVariations: {
      type: Boolean,
      default: false,
    },
    variation: [
      {
        variation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variation",
        },
        selected_values: [
          {
            type: String,
          },
        ],
      },
    ],
    gender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "genderOption",
      required: [
        true,
        "Select gender for this product!. This will improve search functionality",
      ],
    },
    base_price: {
      type: Number,
      min: 0,
    },
    actual_price: {
      type: Number,
      required: [
        true,
        "Enter the actual price for this product! Price to be purchase by customers",
      ],
      min: 0,
    },
    qty_in_stock: {
      type: Number,
      required: [true, "Enter the total number of items in stock!"],
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("product-v2", productSchema);
