const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "User fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Emaill is required"],
      unique: true,
    },
    bio:{
      type: String,
      default: ""
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    favouriteRecipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe"
    }]
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
