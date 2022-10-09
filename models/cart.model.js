const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  _id: { select: false },
});

const cartSchema = mongoose.Schema({
  products: [itemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: Number,
    default: 0,
  },
  __v: { type: Number, select: false },
});

var autoPopulateProduct = function (next) {
  this.populate({
    path: "products",
    populate: [{ path: "productId", model: "Product" }],
  });
  next();
};

cartSchema.pre("findOne", autoPopulateProduct);

exports.Item = itemSchema;
exports.Cart = mongoose.model("Cart", cartSchema);
