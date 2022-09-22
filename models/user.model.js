const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    default: "",
  },
  zip: {
    type: String,
    default: "",
  },
  __v: { type: Number, select: false },
});

exports.User = mongoose.model("User", userSchema);
