const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const productListPath = path.resolve(__dirname, '../data/products.json');
const productList = JSON.parse(fs.readFileSync(productListPath, 'utf8'));

const mainController = {
    home: function (req, res) {
        res.render('index', {
            products: productList
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
        res.render('login');
    },
    loginProcess: function (req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password
        };
        if (user.username == 'admin' && user.password == 'admin') {
            req.session.user = user;
            res.redirect('/admin');
        } else {
            res.redirect('/login');
        }
    },
    register: function (req, res) {
        res.render('register');
    },
    registerProcess: function (req, res) {
        let user = {
            username: req.body.username,
            password: req.body.password
        };
        res.redirect('/login');
    }
}

module.exports = mainController;