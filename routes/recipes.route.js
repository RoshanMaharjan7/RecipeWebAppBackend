const express = require('express');
const { getAllRecipes, createRecipe, getRecipeById, updateById, deleteById, searchRecipe } = require('../controllers/recipes.controller');
const authenicate = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/multer.middleware');
const router = express.Router();

router.get('/', getAllRecipes);
router.post('/', authenicate, upload.fields([{ name: "recipeImage", maxCount: 1 }]), createRecipe);
router.get('/:id', getRecipeById);
router.patch('/:id', updateById);
router.delete('/:id',deleteById)
router.post('/search', searchRecipe)

module.exports = router;