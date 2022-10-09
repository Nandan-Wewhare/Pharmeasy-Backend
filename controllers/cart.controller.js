const { isValidObjectId } = require("mongoose");
const { Cart } = require("../models/cart.model");
const { User } = require("../models/user.model");
const { Product } = require("../models/product.model");

exports.addItemToCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let productId = req.body.productId;
  let product = await Product.findById(productId);
  if (!productId || !product)
    return res.status(400).send({ status: false, message: "Invalid product" });

  let cart = await Cart.findOne({ userId: userId });

  let itemIndex = cart.products.findIndex((p) => p.productId._id == productId);

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
    productItem.quantity += 1;
    cart.products[itemIndex] = productItem;
  } else {
    cart.products.push({ productId: product, quantity: 1 });
  }
  cart.total += product.price - (product.discount / 100) * product.price;
  cart.totalItems += 1;
  cart = await cart.save();
  return res.status(200).send({ status: true, cart: cart });
};

exports.getCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  res.status(200).send({ status: true, cart: cart });
};

exports.decreaseQuantity = async (req, res) => {
  // use add product endpoint for increase quantity
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });
  let productId = req.body.productId;
  let product = await Product.findById(productId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId._id == productId);

  if (itemIndex > -1) {
    let productItem = cart.products[itemIndex];
    if (productItem.quantity > 1) {
      productItem.quantity -= 1;
      cart.products[itemIndex] = productItem;
      cart.total -= product.price - (product.discount / 100) * product.price;
    } else {
      var qty = productItem.quantity;
      cart.products.splice(itemIndex, 1);
      cart.total -=
        (product.price - (product.discount / 100) * product.price) * qty;
    }
    cart.totalItems -= 1;
    cart = await cart.save();
    return res.status(200).send({ status: true, cart: cart });
  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};

exports.removeItem = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.exists({ _id: userId });
  let productId = req.body.productId;
  let product = await Product.findById(productId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let cart = await Cart.findOne({ userId: userId });
  if (!cart)
    return res
      .status(404)
      .send({ status: false, message: "Cart not found for this user" });

  let itemIndex = cart.products.findIndex((p) => p.productId._id == productId);
  if (itemIndex > -1) {
    var qty = cart.products[itemIndex].quantity;
    cart.products.splice(itemIndex, 1);
    cart.total -=
      (product.price - (product.discount / 100) * product.price) * qty;
    cart.totalItems -= qty;
    cart = await cart.save();
    return res.status(200).send({ status: true, cart: cart });
  }
  res
    .status(400)
    .send({ status: false, message: "Item does not exist in cart" });
};
