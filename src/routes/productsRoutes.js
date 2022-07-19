const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');
const validateProduct = require('../middlewares/productValidate');

router.get('/', productsController.index);

router.get('/create', productsController.create);
router.post('/create', upload.array('images', 5), validateProduct, productsController.store);

router.get('/edit/:slug', productsController.edit);
router.put('/edit/:slug', productsController.update);

router.delete('/delete/:slug', productsController.delete);

router.get('/:slug', productsController.show);

module.exports = router;