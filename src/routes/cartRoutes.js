const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const auth = require('../middlewares/isAuth');

router.get('/', cartController.index);

module.exports = router;