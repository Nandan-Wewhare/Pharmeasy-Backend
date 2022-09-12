const mongoose = require("mongoose");

const deliverySchema = mongoose.Schema({
  pincode: {
    type: Number,
    unique: true,
    required: true,
  },
  deliveryBy: {
    type: Date,
    required: true,
  },
});

exports.Delivery = mongoose.model("Pincodes", deliverySchema);
