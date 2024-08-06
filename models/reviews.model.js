const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    recipeId: {
        type: String,
        required: [true, "Recipe Id is required"],
    },
    reviewer: {
        
    }
})

module.exports = mongoose.model('Review', reviewSchema)