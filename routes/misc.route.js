const express = require("express");
const miscRouter = express.Router();
const miscController = require("../controllers/misc.controller");

miscRouter.get(
  "/checkDelivery/:pincode",
  miscController.checkDeliveryAtPincode
);

miscRouter.post("/addPincode", miscController.addPincode);

module.exports = miscRouter;
