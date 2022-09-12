const express = require('express');
const router = express.Router();

const imagesController = require('../../controllers/api/images');

router
    .get('/', imagesController.list)
    .get('/:id', imagesController.show)
    .delete('/:id', imagesController.destroy)
;

module.exports = router;