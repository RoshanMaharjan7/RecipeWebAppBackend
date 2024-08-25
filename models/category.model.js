const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        categoryTitle: {
            type: String,
            required: [true, "Category title is required"],
        },
        categoryImage: {
            type:String,
            required: [true, "Category Image is required"],
        },
        recipes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }]
    }
)

module.exports = mongoose.model("Category",categorySchema)