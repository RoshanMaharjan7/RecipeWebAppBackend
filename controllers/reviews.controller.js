const Review = require("../models/reviews.model");
const Recipe = require("../models/recipes.model");

// Add a Review
const addNewReview = async (req, res) => {
  const { recipeId, reviewText, stars } = req.body;

  try {
    const recipeById = await Recipe.findById(recipeId);
    if (!recipeById) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    const newReview = new Review({
      recipeId: recipeId,
      reviewer: req.user.id,
      stars: stars,
      reviewText: reviewText,
    });

    // Updating recipe datas
    if (recipeById.ratingCount === 0) {
      recipeById.ratings = stars; // Set initial rating
    } else {
      recipeById.ratings =
        (recipeById.ratings * recipeById.reviews.length + stars) /
        (recipeById.reviews.length + 1);
    }

    recipeById.reviews.push(newReview._id);

    console.log(newReview);
    await newReview.save();
    await recipeById.save();

    res.status(200).json({
      success: true,
      message: "New review saved successfully",
      data: newReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
    console.log("Error", error);
  }
};

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find();
    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all reviews",
      error: error.message,
    });
  }
};

const getReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const reviewById = await Review.findById(id);
    if (!reviewById) {
      return res.status(404).json({
        success: false,
        message: `Failed to fetch review of id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: reviewById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe by id",
      error: error.message,
    });
  }
};

const getReviewByRecipe = async (req, res) => {
  const { recipeId } = req.params;
  try {
    const reviewByRecipe = await Review.find({ recipeId: recipeId }).populate({
      path: "reviewer",
      select: "fullName", // Specify that only the fullName field should be included
    });
    if (!reviewByRecipe) {
      return res.status(404).json({
        success: false,
        message: `Failed to fetch review of recipe ${recipeId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: reviewByRecipe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe by recipe",
      error: error.message,
    });
  }
};

// const getReviewByRecipe = async (req, res) => {
//     const {recipeId} = req.body;
//     try {
//         const recipeById = await Recipe.findById(recipeId).populate("reviews")
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch recipe by recipe",
//             error: error.message,
//           });
//     }
// }

module.exports = {
  addNewReview,
  getAllReviews,
  getReviewById,
  getReviewByRecipe,
};
