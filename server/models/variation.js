const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    values: [{ type: String,}],
  },
  { timestamps: true }
);

const genderOptions = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["men", "women", "unisex"],
  },
});

variationSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const Gender = mongoose.model("genderOption", genderOptions);
const Variations = mongoose.model("Variation", variationSchema);

module.exports = {
  Gender,
  Variations,
};
