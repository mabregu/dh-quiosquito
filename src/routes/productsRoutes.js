const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');
const validateProduct = require('../middlewares/productValidate');
const auth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', productsController.index);

router.get('/create', isAdmin, productsController.create);

router.post('/create', isAdmin, upload.array('images', 5), validateProduct, productsController.store);

router.get('/edit/:slug', isAdmin, productsController.edit);
router.put('/edit/:slug', isAdmin, upload.array('images', 5), productsController.update);

router.delete('/delete/:slug', auth, productsController.delete);

router.get('/:slug', productsController.show);

module.exports = router;