const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
const auth = require('../middlewares/isAuth');

router.get('/', auth, customerController.index);
router.get('/my_purchases', auth, customerController.purchase);

module.exports = router;