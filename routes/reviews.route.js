const express = require("express")
const authenicate = require("../middlewares/auth.middleware")
const { addNewReview, getAllReviews } = require("../controllers/reviews.controller")

const router = express.Router()

router.post('/', authenicate, addNewReview)
router.get('/', getAllReviews)

module.exports = router