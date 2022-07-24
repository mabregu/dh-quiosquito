const { validationResult } = require('express-validator');
const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const { isGuest, isLoggedIn } = require('../helpers/userHelpers');
const mainController = {
    home: function (req, res) {
        res.render('index', {
            products: ProductModel.findAll(),
            user: req.session.user || null,
            isGuest: isGuest(req.session),
            isLoggedIn: isLoggedIn(req.session),
        });
    },
    details: function (req, res) {
        const productSlug = req.params.slug;
        const product = ProductModel.findByField('slug', productSlug);
        
        res.render('details', { product });
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
        try {
            let currentUser = {
                username: req.body.email,
                password: req.body.password,
                remember: req.body.remember
            };

            let validate = UserModel.validateUser(currentUser);

            if (validate) {
                req.session.user = validate;
                if (currentUser.remember) {
                    res.cookie('user', JSON.stringify(validate), { maxAge: 1000 * 60 * 60 * 24 * 7 });
                }
                res.redirect('/');
            } else {
                res.render('auth/login', { error: 'Invalid username or password' });
            }
        } catch (error) {
            res.render('auth/login', {
                error: 'Invalid username or password'
            });
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        res.clearCookie('user');
        res.redirect('/');
    },
    register: function (req, res) {
        res.render('auth/register');
    },
    registerProcess: function (req, res) {
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

            let user = UserModel.create(newUser);

            if (user.error) {
                return res.render('auth/register', {
                    errors: user.error,
                    old: req.body,
                });
            }

            res.redirect('/login', { success: 'Registration successful' });
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