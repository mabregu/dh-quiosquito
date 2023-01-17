const { validationResult } = require('express-validator');
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const FavoriteModel = require('../models/favoriteModel');
const { isGuest, isLoggedIn } = require('../helpers/userHelpers');

const mainController = {
    home: function (req, res) {
        
        ProductModel.findAll()
            .then(products => {
                res.render('index', {
                    products: products || [],
                    isGuest: isGuest(req.session),
                    isLoggedIn: isLoggedIn(req.session),
                    favorites: FavoriteModel.getFavorites(req.session.user.id)
                });
            })
            .catch(error => {
                res.render('index', {
                    products: null,
                    user: req.session.user || null,
                    isGuest: isGuest(req.session),
                    isLoggedIn: isLoggedIn(req.session),
                    message: {
                        type: 'danger',
                        text: 'Error al cargar los productos: ' + error
                    }
                });
            })
        ;
    },
    about: function (req, res) {
        res.render('about');
    },
    contact: function (req, res) {
        res.render('contact');
    },
    login: function (req, res) {
        res.render('auth/login');
    },
    loginProcess: function (req, res) {
        let currentUser = {
            email: req.body.email,
            password: req.body.password,
            remember: req.body.remember
        };

        UserModel.validateUser(currentUser)
            .then(user => {
                if (!user) {
                    return res.render('auth/login', {
                        error: 'Usuario o contraseña incorrectos',
                    });
                }

                res.locals.user = req.session.user = user;
                
                if (currentUser.remember) {
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;
                }

                res.redirect('/');
            })
        ;

    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/');
    },
    register: function (req, res) {
        res.render('auth/register');
    },
    registerProcess: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render('auth/register', {
                    errors: errors.mapped(),
                    old: req.body,
                });
            }

            let newUser = {
                name: req.body.name,
                username: req.body.email,
                password: req.body.password,
            }

            let user = await UserModel.create(newUser);
            
            if (user.error) {
                return res.render('auth/register', {
                    errors: user.error,
                    old: req.body,
                });
            }

            res.redirect('/login');
        } catch (error) {
            res.render('auth/register', {
                error: 'Error creating user'
            });
        }
    },
    profile: function (req, res) {
        let user = req.session.user;

        if (!user) {
            res.redirect('/login');
        }

        res.render('auth/profile', { user: req.session.user });
    }
}

module.exports = mainController;