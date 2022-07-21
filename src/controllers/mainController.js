const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const productListPath = path.resolve(__dirname, '../data/products.json');
const productList = JSON.parse(fs.readFileSync(productListPath, 'utf8'));

const UserModel = require('../models/userModel');

const mainController = {
    home: function (req, res) {
        let user = req.session.user;        

        res.render('index', {
            products: productList,
            user: user
        });
    },
    details: function (req, res) {
        const productSlug = req.params.slug;
        const product = productList.find(product => product.slug === productSlug);
        
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
            let newUser = {
                name: req.body.name,
                username: req.body.email,
                password: req.body.password,
            }

            UserModel.create(newUser);

            res.redirect('/login', {
                success: 'User created successfully'
            });
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