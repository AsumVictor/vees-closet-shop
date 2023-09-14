const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "first name is required to filled"],
    },
    last_name: {
      type: String,
      required: [true, "last name is required to filled"],
    },
    email: {
      type: String,
      unique: [true, 'User already exist. Try logging in'],
      required: [true, "email address is required to filled"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address-v1"
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    isEmail_verified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  {
    timestamps: true,
  }
);
 
//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User-v2", userSchema);
