const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const User = require("../models/users.model");
const Recipe = require("../models/recipes.model");

// Create new User for user sign up
const userRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Register Failed" });
    }

    res.status(200).json({
      success: true,
      message: "User registered Successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error", error);
  }
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.fullName,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ success: true, message: "User Logged In successfully", token });
  } catch (error) {
    console.error("Error", error);
  }
};

// Add to favourite
const addToFavourite = async (req, res) => {
  const { recipeId } = req.body;

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" });
    }

    console.log(req.user.id);

    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.favouriteRecipes.push(recipeId);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Recipe added to favorites",
      favouriteRecipes: user.favouriteRecipes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Remove from favourites
const removeFromFavourites = async (req,res) => {
    const {recipeId} = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found" });
        }

        user.favouriteRecipes = user.favouriteRecipes.filter((item) => item != recipeId)
        await user.save()

        res.status(200).json({
            success: true,
            message: "Recipe removed from favorites",
            favouriteRecipes: user.favouriteRecipes,
          });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Fetch All Favourite Recipe of a User
const getFavourites = async (req, res) => {
  try {
    // Populate the favoriteBooks field
    const user = await User.findById(req.user.id).populate("favouriteRecipes");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Favourite Recipes fetched successfully",
      favouriteRecipes: user.favouriteRecipes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch All Users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update User by Id
const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res
      .status(200)
      .json({
        success: true,
        message: "User Updated successfully",
        data: userById,
      });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Failed to update user by id" });
  }
};

// Delete User By Id
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const userById = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        success: true,
        message: "User deleted successfully",
        data: userById,
      });
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Failed to delete user by id" });
  }
};
module.exports = {
  userRegister,
  userLogin,
  addToFavourite,
  getFavourites,
  removeFromFavourites,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
