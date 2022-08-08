const { validationResult } = require('express-validator');
// const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const db  = require('../database/models');
const { isGuest, isLoggedIn } = require('../helpers/userHelpers');

const mainController = {
    home: function (req, res) {
        let productList = db.Products.findAll({
            include: [
                'category',
                'currency',
                {
                    model: db.Image,
                    as: 'images',
                    attributes: ['id', 'name', 'type', 'size', 'path'],
                    where: {
                        deletedAt: null
                    }
                }
            ],
            where: {
                deletedAt: null
            },
            limit: 16,
        })

        productList
            .then(products => {
                //console.log(products);
                res.render('index', {
                    products: products || [],
                    user: req.session.user || null,
                    isGuest: isGuest(req.session),
                    isLoggedIn: isLoggedIn(req.session),
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
    details: function (req, res) {
        const productSlug = req.params.slug;
        //const product = ProductModel.findByField('slug', productSlug);
        const product = db.Product.findOne({
            include: ['images', 'category', 'currency'],
            where: {
                slug: productSlug,
                deletedAt: null
            }
        });

        product
            .then(product => {
                if (product) res.render('details', { product });
                else res.redirect('/');
            })
            .catch(error => {
                res.render('details', {
                    product: null,
                    message: {
                        type: 'danger',
                        text: 'Error al cargar el producto: ' + error
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