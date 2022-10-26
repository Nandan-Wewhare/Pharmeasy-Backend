const { Order } = require("../models/order.model");

exports.createOrder = async (req, res) => {
  let newOrder = await Order.create({
    products: req.body.products,
    user: req.params.userId,
    total: req.body.total,
  });

  if (!newOrder)
    return res
      .status(400)
      .send({ status: false, message: "Failed to create order" });

  res.status(201).send({ status: true, order: newOrder });
};

exports.getUserOrders = async (req, res) => {
  let orders = await Order.find({ user: req.params.userId });
  return res.status(200).send({ status: true, orders: orders });
};

exports.cancelOrder = async (req, res) => {
  let orderId = req.params.orderId;

  let order = await Order.findByIdAndUpdate(
    orderId,
    { cancelled: true },
    { new: true }
  );

  if (!order)
    return res
      .status(400)
      .send({ status: false, message: "No order with this orderID exists" });

  res.status(200).send({ status: true, order: order });
};
