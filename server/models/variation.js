const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    values: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const variationOptions = new mongoose.Schema({
  variation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Variation",
    required: true,
  },
  values: [{ type: String, required: true }],
});

const genderOptions = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["male", "female", "unisex"],
  },
});

variationSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);
module.exports = mongoose.model("Variation", variationSchema);
module.exports = mongoose.model("VariationOption", variationOptions);
module.exports = mongoose.model("genderOption", genderOptions);
