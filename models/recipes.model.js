const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe Title is required"],
    },
    description: {
      type: String,
      required: [true, "Recipe Description is required"],
    },
    category: {
      type: String,
      required: [true, "Recipe Category is required"],
    },
    ingredients: [
      {
        type: String,
        required: [true, "Recipe Ingredients is required"],
      },
    ],
    directions: [
      {
        type: String,
        required: [true, "Recipe Directions is required"],
      },
    ],
    chief: {
      type: String,
      required: [true, "Recipe Chief is required"],
    },
    ratings: [{
      type: Number
    }],
    reviews:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
