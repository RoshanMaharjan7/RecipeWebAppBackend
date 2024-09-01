const Category = require("../models/category.model");
const { uploadOnCloundinary } = require("../utils/cloudinary.js");

// create new Category
const createCategory = async (req, res) => {
  const { categoryTitle, categoryImage } = req.body;

  try {
    const imageResult = await uploadOnCloundinary(
      req.files?.categoryImage[0]?.path
    );
    const newCategory = new Category({
      categoryTitle,
      categoryImage: imageResult.secure_url,
    });

    await newCategory.save();

    res
      .status(201)
      .json({
        success: true,
        message: "New Category created successfully",
        data: newCategory,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to create new category",
      error: error.message,
    });
    console.error("Error", error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();

    res
      .status(201)
      .json({
        success: true,
        message: "Successfully fetched all categories",
        data: categories,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to fetch all categories",
      error: error.message,
    });
    console.error("Error", error);
  }
};

// fetch category by id
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const categoryById = await Category.findById(id).populate("recipes");

    res
      .status(201)
      .json({
        success: true,
        message: "Successfully fetched category by id",
        data: categoryById,
      });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Failed to find category by id",
      error: error.message,
    });
    console.error("Error", error);
  }
};

const searchCategory = async (req, res) => {
  try {
    // Get the search query from the request
    const query = req.body.query.toLowerCase();

    // Fetch all recipes from the database
    const allCategories = await Category.find();

    // Filter the recipes based on the search query
    const results = allCategories.filter((recipe) =>
      recipe.categoryTitle.toLowerCase().includes(query)
    );

    // Return the matching results
    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Failed to delete by id",
      error: error.message,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  searchCategory,
};
