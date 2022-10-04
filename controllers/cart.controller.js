const { isValidObjectId } = require("mongoose");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");

exports.addItemToCart = async (req, res) => {
  let userId = req.params.userId;
  let user = await User.findById(userId);

  if (!userId || !isValidObjectId(userId) || !user)
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  let product = await Product.findById(req.body.productId);
  if (!product)
    return res.status(400).send({ status: false, message: "Invalid product" });

  let result = await user.updateOne({
    $addToSet: { cart: { product, quantity: 1 } }, // inserts only if that product is not present in cart
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

exports.updateQuantity = async (req, res) => {
  let userId = req.params.userId;
  let productId = req.body.productId;
  let increment = req.query.increment ?? true;

  if (!userId || !isValidObjectId(userId))
    return res.status(400).send({ status: false, message: "Invalid user ID" });

  if (!productId)
    return res
      .status(400)
      .send({ status: false, message: "Product ID is required" });

  let user = await User.findOneAndUpdate(
    { _id: userId, "cart.product._id": productId },
    { $inc: { "cart.quantity": 1 } }
  );

  if (!user)
    return res
      .status(400)
      .send({ status: false, message: "Update quantity failed" });

  res.status(200).send({ status: true, updatedItem: requiredItem });
};
