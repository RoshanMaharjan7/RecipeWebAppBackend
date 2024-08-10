const express = require('express');
const { userRegister, userLogin, addToFavourite, getFavourites } = require('../controllers/user.controller');
const authenicate = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/favourites',authenicate, addToFavourite)
router.get('/favourites',authenicate, getFavourites)


module.exports = router