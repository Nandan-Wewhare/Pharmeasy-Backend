const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");

productRouter.post("/:categoryId", productController.addProductsToCategory);
productRouter.get("/:categoryId", productController.getProductsInCategory);

module.exports = productRouter;
