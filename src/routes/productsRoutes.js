const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');

router.get('/', productsController.index);

router.get('/create', productsController.create);
router.post('/create', upload.array('images', 5), productsController.store);

router.get('/edit/:slug', productsController.edit);
router.put('/edit/:slug', productsController.update);

router.get('/:slug', productsController.show);


module.exports = router;