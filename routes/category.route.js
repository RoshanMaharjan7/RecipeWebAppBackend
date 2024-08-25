const express = require('express');
const { createCategory, getAllCategory, getCategoryById } = require('../controllers/category.controller');
const router = express.Router();

router.post('/', createCategory)
router.get('/',getAllCategory)
router.get('/:id', getCategoryById)


module.exports = router