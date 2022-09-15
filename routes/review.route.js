const express = require("express");
const reviewRouter = express.Router();
const reviewController = require("../controllers/review.controller");

reviewRouter.get("/portalReviews", reviewController.getPortalReviews);

reviewRouter.post("/portalReview/:userId", reviewController.addPortalReview);

// TODO: add product review routes

module.exports = reviewRouter;
