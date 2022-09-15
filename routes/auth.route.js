const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.patch("/updateUser/:userId", authController.updateUser);

module.exports = authRouter;
