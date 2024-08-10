const Review = require('../models/reviews.model')
const Recipe = require('../models/recipes.model')

// Add a Review
const addNewReview = async (req,res) => {
    const {recipeId, reviewText, stars} = req.body;

    try {
        const recipeById = await Recipe.findById(recipeId);
        if(!recipeById){
            return res.status(404).json({success: false, message: "Recipe not found"})
        }

        const newReview = new Review({recipeId: recipeId, reviewer: req.user.id, stars: stars, reviewText: reviewText});
        
        // Updating recipe datas
        recipeById.ratings.push(stars)
        recipeById.reviews.push(newReview._id)

        console.log(newReview)
        await newReview.save()
        await recipeById.save()

        res.status(200).json({success: true, message: "New review saved successfully", data: newReview})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add review",
            error: error.message,
          });
          console.log("Error", error);
    }
}

module.exports = {addNewReview}