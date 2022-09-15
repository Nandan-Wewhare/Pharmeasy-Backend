const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller");

categoryRouter.post("/", categoryController.addCategories);
categoryRouter.get("/", categoryController.getAllCategories);

module.exports = categoryRouter;
