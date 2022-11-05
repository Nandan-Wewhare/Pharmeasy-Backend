const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    total: {
      type: Number,
      default: 0,
    },
    cancelled: {
      type: Boolean,
      default: false,
    },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

var autoPopulateProductandUser = function (next) {
  this.populate("products");
  next();
};

orderSchema.pre("find", autoPopulateProductandUser);

exports.Order = mongoose.model("Order", orderSchema);
