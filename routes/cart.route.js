const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cart.controller");

cartRouter.post("/add/:userId", cartController.addItemToCart);
cartRouter.get("/:userId", cartController.getCart);

module.exports = cartRouter;
