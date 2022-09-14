const express = require("express");
const { default: mongoose } = require("mongoose");
const { PortalReview } = require("../models/portal-review.model");
const reviewRouter = express.Router();

reviewRouter.get("/portalReviews", async (req, res) => {
  // get most recent 6 reviews
  let reviews = await PortalReview.find().sort({ createdAt: -1 }).limit(6);

  if (!reviews)
    return res
      .status(400)
      .send({ status: false, message: "Unable to fetch portal reviews" });

  res.status(200).send({ status: true, portalReviews: reviews });
});

reviewRouter.post("/portalReview/:userId", async (req, res) => {
  let reviews = [];

  req.body.portalReviews.map((r) => {
    reviews.push(
      new PortalReview({
        reviewer: req.params.userId,
        review: r.review,
      })
    );
  });

  var result = await PortalReview.insertMany(reviews);

  if (!result)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add portal reviews" });

  res.status(201).send({ status: true, reviews: reviews });
});

// TODO: add product review routes

module.exports = reviewRouter;
