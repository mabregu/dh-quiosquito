const express = require('express');
const router = express.Router();

const invoiceController = require('../controllers/invoiceController');
const auth = require('../middlewares/isAuth');

router.get('/', invoiceController.index);
router.post('/create', auth, invoiceController.create);

module.exports = router;