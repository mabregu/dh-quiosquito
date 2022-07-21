const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const productListPath = path.resolve(__dirname, '../data/products.json');
const productList = JSON.parse(fs.readFileSync(productListPath, 'utf8'));

const userListPath = path.resolve(__dirname, '../data/users.json');
const userList = JSON.parse(fs.readFileSync(userListPath, 'utf8'));

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
        let currentUser = {
            username: req.body.email,
            password: req.body.password,
            remember: req.body.remember
        };

        let userFound = userList.find(user => user.username === currentUser.username);

        if (userFound && bcrypt.compareSync(currentUser.password, userFound.password)) {
            req.session.user = userFound;
            if (currentUser.remember) {
                res.cookie('user', userFound, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            }
            res.redirect('/');
        } else {
            res.render('auth/login', {
                error: 'Invalid username or password'
            });
        }
    },
    register: function (req, res) {
        res.render('auth/register');
    },
    registerProcess: function (req, res) {
        let user = {
            name: req.body.name,
            username: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };
        
        userList.push(user);

        fs.writeFileSync(userListPath, JSON.stringify(userList, null, 2));

        res.redirect('/login');
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