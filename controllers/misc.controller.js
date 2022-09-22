const { Delivery } = require("../models/delivery.model");

exports.checkDeliveryAtPincode = async (req, res) => {
  let deliveryData = await Delivery.findOne({
    pincode: req.params.pincode,
  }).select("-__v");

  if (!deliveryData)
    return res.status(200).send({
      status: false,
      message: "Sorry, we do not deliver at this pincode currently.",
    });

  res.status(200).send({ status: true, data: deliveryData });
};

exports.addPincode = async (req, res) => {
  let deliveryData = new Delivery({
    pincode: req.body.pincode,
    deliveryBy: req.body.deliveryBy,
  });

  deliveryData = await deliveryData.save();

  if (!deliveryData)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add delivery data." });

  res.status(201).send({ status: true, data: deliveryData });
};
