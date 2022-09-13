const express = require("express");
const { Category } = require("../models/category.model");
const categoryRouter = express.Router();

categoryRouter.post("/", async (req, res) => {
  let categories = [];
  req.body.categories.map((c) => {
    categories.push(new Category({ name: c.name, image: c.image }));
  });

  var result = await Category.insertMany(categories);
  if (!result)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add categories" });

  res.status(201).send({ status: false, categories: categories });
});

module.exports = categoryRouter;
