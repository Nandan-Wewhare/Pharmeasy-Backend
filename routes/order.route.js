const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order.controller");

orderRouter.get("/:userId", orderController.getUserOrders);
orderRouter.post("/:userId", orderController.createOrder);
orderRouter.patch("/:orderId", orderController.cancelOrder);

module.exports = orderRouter;
