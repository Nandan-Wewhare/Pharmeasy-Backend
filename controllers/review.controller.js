const { PortalReview } = require("../models/portal-review.model");

exports.getPortalReviews = async (req, res) => {
  // get most recent 6 reviews
  let reviews = await PortalReview.find().sort({ createdAt: -1 }).limit(6);

  if (!reviews)
    return res
      .status(400)
      .send({ status: false, message: "Unable to fetch portal reviews" });

  res.status(200).send({ status: true, portalReviews: reviews });
};

exports.addPortalReview = async (req, res) => {
  let portalReview = new PortalReview({
    reviewer: req.params.userId,
    review: req.body.review,
  });

  var result = await PortalReview.create(portalReview);

  if (!result)
    return res
      .status(400)
      .send({ status: false, message: "Failed to add portal review" });

  res.status(201).send({ status: true, review: portalReview });
};
