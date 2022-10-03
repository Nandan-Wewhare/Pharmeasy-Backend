const mongoose = require("mongoose");

const cartItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  __v: { type: Number, select: false },
});

exports.CartItem = mongoose.model("CartItem", cartItemSchema);
