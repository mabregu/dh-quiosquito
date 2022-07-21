const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productListPath = path.resolve(__dirname, '../data/products.json');
const productList = JSON.parse(fs.readFileSync(productListPath, 'utf8'));

const currencyListPath = path.resolve(__dirname, '../data/currencies.json');
const currencyList = JSON.parse(fs.readFileSync(currencyListPath, 'utf8'));

const productsController = {
    index: (req, res) => {
        res.render('products/index', {
            products: productList
        });
    },
    create: (req, res) => {
        let user = req.session.user;

        res.render('products/create', {
            currencies: currencyList,
            user
        });
    },
    store: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('products/create', {
                errors: errors.mapped(),
                old: req.body,
                currencies: currencyList
            });
        }
        
        let images = req.files;
        let imagesArray = [];
        for (let i = 0; i < images.length; i++) {
            imagesArray.push(images[i].filename);
        }
        
        let slug = req.body.name.toLowerCase().replace(/ /g, '-');
        
        let products = {
            id: uuidv4(),
            name: req.body.name,
            slug,
            description: req.body.description,
            currency: req.body.currency,
            price: req.body.price,
            images: imagesArray,
        }
        
        productList.push(products);
        
        fs.writeFileSync(productListPath, JSON.stringify(productList, null, 2));

        res.redirect('/');
    },
    edit: (req, res) => {
        let user = req.session.user;
        let productSlug = req.params.slug;
        let product = productList.find(product => product.slug === productSlug);
        
        res.render('products/edit', {
            product,
            currencies: currencyList,
            user
        });
    },
    update: (req, res) => {
        res.render('products/update');
    },
    delete: (req, res) => {
        res.render('products/delete');
    },
    show: (req, res) => {
        const productSlug = req.params.slug;
        const product = productList.find(product => product.slug === productSlug);
        
        res.render('products/show', {
            product
        });
    }
}

module.exports = productsController;