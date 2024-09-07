const mongoose = require("mongoose");

const ingredientsSchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: [true, "Quantity is required"],
  },
  name: {
    type: String,
    required: [true, "Ingredient name is required"],
  },
});


const categorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Category Id is required"],
    ref: "Category",
  },
  categoryName: {
    type: String,
    required: [true, "Category Name is required"],
  },
});

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe Title is required"],
    },
    recipeImage: {
      type: String,
      required: [true, "Recipe Image is required"]
    },
    description: {
      type: String,
      required: [true, "Recipe Description is required"],
    },
    category: [
      {
        type:  categorySchema,
        required: [true, "Recipe Category is required"],
      },
    ],
    ingredients: [
      {
        type: ingredientsSchema,
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
    ratings: {
      type: Number,
      default: 0
    },
    reviews:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
