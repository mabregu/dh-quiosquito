const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');
const validateProduct = require('../middlewares/productValidate');
const auth = require('../middlewares/isAuth');

router.get('/', productsController.index);

router.get('/create', auth, productsController.create);

router.post('/create', auth, upload.array('images', 5), validateProduct, productsController.store);

router.get('/edit/:slug', auth, productsController.edit);
router.put('/edit/:slug', auth, productsController.update);

router.delete('/delete/:slug', auth, productsController.delete);

router.get('/:slug', productsController.show);

module.exports = router;