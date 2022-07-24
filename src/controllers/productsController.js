const { validationResult } = require('express-validator');
const CurrencyModel = require('../models/currenciesModel');
let currencyList = CurrencyModel.findAll();
const ProductModel = require('../models/productModel');
const productsController = {
    index: (req, res) => {
        res.render('products/index', {
            products: ProductModel.findAll(),
        });
    },
    create: (req, res) => {
        res.render('products/create', {
            currencies: currencyList,
            user: req.session.user || null,
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
        
        let product = ProductModel.create(req.body, req.files);
        
        if (product.error) {
            console.log(product.error);
            return res.render('products/create', {
                errors: product.error,
                old: req.body,
                currencies: currencyList
            });
        }

        res.redirect('/');
    },
    edit: (req, res) => {
        let productSlug = req.params.slug;
        
        let product = ProductModel.findByField('slug', productSlug);

        if (!product) {
            return res.redirect('/products', {
                error: 'Product not found'
            });
        }

        res.render('products/edit', {
            product,
            currencies: currencyList,
            user: req.session.user || null,
        });
    },
    update: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('products/edit', {
                errors: errors.mapped(),
                old: req.body,
                currencies: currencyList
            });
        }

        let product = ProductModel.update(req.params.id, req.body);

        if (product.error) {
            return res.render('products/edit', {
                errors: product.error,
                old: req.body,
                currencies: currencyList
            });
        }

        res.redirect('/products');
    },
    delete: (req, res) => {
        let productId = req.params.id;
        let product = ProductModel.find(productId);
        if (product) {
            ProductModel.delete(productId);
            res.redirect('/products', {
                message: 'Product deleted successfully'
            });
        }
        res.redirect('/products', {
            message: 'Product not found'
        });
    },
    show: (req, res) => {
        let productSlug = req.params.slug;
        let product = ProductModel.findByField('slug', productSlug);
        res.render('products/show', {
            product,
            user: req.session.user || null,
        });
    }
}

module.exports = productsController;