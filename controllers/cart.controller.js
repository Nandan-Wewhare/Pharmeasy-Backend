const { isValidObjectId } = require("mongoose");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");
const mongoose = require("mongoose");

exports.addItemToCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.findById(userId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let product = await Product.findById(req.body.productId);
  if (!product)
    return res.status(400).send({ status: false, message: "Invalid product" });

  let result = await user.updateOne({
    $push: { cart: { product: product, quantity: 1 } },
  });
  if (!result)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add item to cart" });

  res
    .status(200)
    .send({ status: true, message: "Item added to cart successfully" });
};

exports.getCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.findById(userId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await user.get("cart");

  res.status(200).send({ status: true, cart: cart });
};
