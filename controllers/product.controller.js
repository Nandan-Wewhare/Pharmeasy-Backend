const mongoose = require("mongoose");
const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");

exports.addProductsToCategory = async (req, res) => {
  let products = [];
  let categoryId = req.params.categoryId;
  let validCategory = await Category.findById(categoryId);
  if (!categoryId || !mongoose.isValidObjectId(categoryId) || !validCategory)
    return res
      .status(400)
      .send({ status: false, message: "Invalid category id" });

  req.body.products.map((product) => {
    products.push(
      new Product({
        name: product.name,
        description: product.description,
        image: product.image,
        brand: product.brand,
        price: product.price,
        category: categoryId,
        discount: product.discount,
      })
    );
  });

  var result = await Product.insertMany(products);
  if (!result)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add products" });

  res.status(201).send({ status: true, products: products });
};

exports.getProductsInCategory = async (req, res) => {
  let products = [];
  let categoryId = req.params.categoryId;

  let category = await Category.findById(categoryId);

  if (!mongoose.isValidObjectId(categoryId) || !category || !categoryId)
    return res
      .status(400)
      .send({ status: false, message: "Invalid category id" });

  products = await Product.find({ category: categoryId }).select("-__v");

  res.status(200).send({ status: true, products: products });
};
