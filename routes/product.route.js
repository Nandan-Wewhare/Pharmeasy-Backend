const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product.controller");

productRouter.post("/addProductsToCategory/:categoryId", productController.addProductsToCategory);
productRouter.get("/getProductsInCategory/:categoryId", productController.getProductsInCategory);

productRouter.get("/:productId", productController.getProductDetail);

module.exports = productRouter;
