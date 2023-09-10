// categories routes
const express = require('express');
const router = express.Router();

const categoriesController = require('../../controllers/api/categories');

router
    .get('/', categoriesController.list)
    .get('/:id', categoriesController.show)
    .post('/', categoriesController.store);

module.exports = router;