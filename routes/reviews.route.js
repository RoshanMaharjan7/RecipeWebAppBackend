const express = require("express")
const authenicate = require("../middlewares/auth.middleware")
const { addNewReview } = require("../controllers/reviews.controller")

const router = express.Router()

router.post('/', authenicate, addNewReview)

module.exports = router