const { body } = require('express-validator');

const validateProduct = [
    body('name')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número mayor a 0'),
    body('currency')
        .notEmpty()
        .withMessage('La moneda es requerida'),
    body('description')
        .isLength({ min: 10 })
        .withMessage('La descripción debe tener al menos 10 caracteres'),
    body('images')
        .custom((value, { req }) => {
            let images = req.files;

            if (images.length < 1) {
                throw new Error('Debe subir al menos una imagen');
            }
            return true;
        })
];

module.exports = validateProduct;