const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      require: true,
      unique: true,
      type: String,
    },

  },
  { timestamps: true }
);

categorySchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

module.exports = mongoose.model("Category", categorySchema);
