const express = require("express")
const authenicate = require("../middlewares/auth.middleware")
const { addNewReview, getAllReviews, getReviewByRecipe } = require("../controllers/reviews.controller")

const router = express.Router()

router.post('/', authenicate, addNewReview)
router.get('/', getAllReviews)
router.get('/recipe/:recipeId', getReviewByRecipe)

module.exports = router