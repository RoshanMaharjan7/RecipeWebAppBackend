const express = require("express");
const {
  userRegister,
  userLogin,
  addToFavourite,
  getFavourites,
  getAllUsers,
  updateUserById,
  deleteUserById,
  removeFromFavourites,
  getCurrentUser,
} = require("../controllers/user.controller");
const authenicate = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/favourites", authenicate, addToFavourite);
router.get("/favourites", authenicate, getFavourites);
router.patch('/favourites',authenicate, removeFromFavourites)
router.get("/", getAllUsers);
router.patch("/:id", updateUserById);
router.delete("/:id", deleteUserById);
router.get("/current-user", authenicate, getCurrentUser);

module.exports = router;
