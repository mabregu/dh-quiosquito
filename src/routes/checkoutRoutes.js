const express = require('express');
const router = express.Router();

const checkoutController = require('../controllers/checkoutController');
const auth = require('../middlewares/isAuth');

router.get('/', auth, checkoutController.index);
router.post('/process', checkoutController.process);
//router.post('/process', auth, checkoutController.process);
router.get('/success', auth, checkoutController.success);
router.get('/failure', auth, checkoutController.failure);
router.get('/pending', auth, checkoutController.pending);

module.exports = router;