const { body } = require('express-validator');

const validateUser = [
    body('name')
        .isLength({ min: 3 })
        .withMessage('El nombre debe tener al menos 3 caracteres'),
    body('email')
        .isEmail()
        .withMessage('El email debe ser válido'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    // body('confirmPassword')
    //     .custom((value, { req }) => {
    //         if (value !== req.body.password) {
    //             throw new Error('Las contraseñas no coinciden');
    //         }
    //         return true;
    //     }
    // )
];

module.exports = validateUser;