const { Category } = require("../models/category.model");

exports.addCategories = async (req, res) => {
  let categories = [];
  req.body.categories.map((c) => {
    categories.push(new Category({ name: c.name, image: c.image }));
  });

  var result = await Category.insertMany(categories);
  if (!result)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add categories" });

  res.status(201).send({ status: true, categories: categories });
};

exports.getAllCategories = async (req, res) => {
  let allCategories = await Category.find().select("-__v");

  if (!allCategories)
    return res
      .status(404)
      .send({ status: false, message: "Error in fetching all categories" });

  res.status(200).send({ status: true, categories: allCategories });
};
