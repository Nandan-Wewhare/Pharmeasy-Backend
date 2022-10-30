const { Order } = require("../models/order.model");
const { Cart } = require("../models/cart.model");

exports.createOrder = async (req, res) => {
  let userId = req.params.userId;
  let newOrder = await Order.create({
    paymentId: req.body.paymentId,
    products: req.body.products,
    user: userId,
    total: req.body.total,
  });
  if (!newOrder)
    return res
      .status(400)
      .send({ status: false, message: "Failed to create order" });

  await Cart.findOneAndUpdate(
    { userId: userId },
    { $set: { products: [], total: 0, totalItems: 0 } }
  );
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
