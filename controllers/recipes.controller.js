const Recipe = require("../models/recipes.model.js");
const Category = require('../models/category.model');

// Create New Recipe
const createRecipe = async (req, res) => {
  const { title, description, category, ingredients, directions, chief } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      description,
      category,
      ingredients,
      directions,
      category,
      chief,
    });

    const categoryUpdate = category.map(categoryId => ({
      updateOne: {
        filter: { _id: categoryId },
        update: { $push: { recipes: newRecipe._id } }
      }
    }));

    await newRecipe.save()
    await Category.bulkWrite(categoryUpdate);

    res.status(200).json({
      success: true,
      message: "New Recipe created successfully",
      data: newRecipe,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to create new recipe",
      error: error.message,
    });
    console.error("Error", error);
  }
};


// Get All Recipes
const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.status(200).json({
      success: true,
      message: "Recipes fetched successfully",
      data: allRecipes,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to fetch recipes",
      error: error.message,
    });
    console.log("Error", error);
  }
};

// Get Recipes By Id
const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await Recipe.findById(id).populate("reviews");
    if (!recipeById) {
      return res.status(404).json({
        success: false,
        message: `Failed to fetch recipe of id ${id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Recipe fetched successfully",
      data: recipeById,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe by id",
      error: error.message,
    });
    console.log("Error", error);
  }
};

// Update Recipe by Id
const updateById = async (req, res) => {
  try {
    const {id} = req.params;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body,{new:true, runValidators:true})
    res.status(201).json({success: true, message: "Recipe updated successfully", data: updatedRecipe})
    
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "Failed to update by id",
        error: error.message,
      });
  }
};

// Delete By Id
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await Recipe.findByIdAndDelete(id);
    await Category.updateMany(
      { recipes: id },
      { $pull: { recipes: id } }
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Recipe deleted successfully",
        data: recipeById,
      });
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: "Failed to delete by id",
        error: error.message,
      });
  }
};


module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateById,
  deleteById,
};
