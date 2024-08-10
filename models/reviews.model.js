const mongoose = require("mongoose");

const reviewerSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Reviewer Id is required"],
  },
  reviewerName: {
    type: String,
    required: [true, "Reviewer Name is required"],
  },
});

const reviewSchema = new mongoose.Schema(
  {
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Recipe Id is required"],
    },
    reviewer: [reviewerSchema],
    stars: {
      type: Number,
      required: [true, "Review Star is required"],
    },
    review: {
      type: String,
      required: [true, "Review is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
