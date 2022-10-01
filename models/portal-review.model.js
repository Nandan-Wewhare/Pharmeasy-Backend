const mongoose = require("mongoose");

const portalReviewSchema = mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  __v: { type: Number, select: false },
});

var autoPopulateReviewer = function (next) {
  this.populate("reviewer");
  next();
};

portalReviewSchema.pre("find", autoPopulateReviewer);

exports.PortalReview = mongoose.model("PortalReviews", portalReviewSchema);
