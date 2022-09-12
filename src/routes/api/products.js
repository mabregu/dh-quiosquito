const express = require('express');
const router = express.Router();

const productsController = require('../../controllers/api/products');
const upload = require('../../middlewares/multer');
const validateProduct = require('../../middlewares/productValidate');
const auth = require('../../middlewares/isAuth');

router
    .get('/', productsController.list)
    .get('/:id', productsController.show)
    .post('/', productsController.store)
;

module.exports = router;