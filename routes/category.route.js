const express = require('express');
const { createCategory, getAllCategory, getCategoryById } = require('../controllers/category.controller');
const { upload } = require('../middlewares/multer.middleware');
const router = express.Router();

router.post('/',upload.fields([{ name: "categoryImage", maxCount: 1 }]), createCategory)
router.get('/',getAllCategory)
router.get('/:id', getCategoryById)


module.exports = router