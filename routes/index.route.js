const express = require('express')
const recipeRoutes = require('../routes/recipes.route.js')
const reviewRoutes = require('../routes/reviews.route.js')
const userRoutes = require('../routes/user.route.js')
const categoryRoutes = require('../routes/category.route.js')
const router = express.Router();


router.use('/recipe', recipeRoutes)
router.use('/reviews', reviewRoutes)
router.use('/users', userRoutes)
router.use('/category', categoryRoutes)

module.exports = router;