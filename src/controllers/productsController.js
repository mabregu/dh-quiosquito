const fs = require('fs');
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
            // elinminar los archivos subidos
            if (req.files) {
                req.files.forEach(file => {
                    fs.unlink(file.path, err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                });
            }

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
        let product = ProductModel.findByField('slug', req.params.slug);
        console.log("old product", product.images);
        console.log("new product", req.body.images);
        let images = req.body.images;
        if (images) {
            images = images.map(image => {
                return {
                    id: uuid.v4(),
                    url: image.filename
                }
            });
        }
        // if (!product) return res.redirect('/');
        
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     return res.render('products/edit', {
        //         errors: errors.mapped(),
        //         old: req.body,
        //         currencies: currencyList,
        //         product,
        //     });
        // }

        // let productUpdated = ProductModel.update(product, req.body, req.files);

        // if (productUpdated.error) {
        //     return res.render('products/edit', {
        //         errors: productUpdated.error,
        //         old: req.body,
        //         currencies: currencyList,
        //         product,
        //     });
        // }

        // res.redirect('/');
    },
    delete: (req, res) => {
        let productSlug = req.params.slug;
        let product = ProductModel.findByField('slug', productSlug);

        if (product) {
            ProductModel.delete(product.id);

            return res.json({
                success: true,
                message: 'Product deleted'
            });
        }

        return res.json({
            success: false,
            error: 'Product not found'
        });
    },
    show: (req, res) => {
        let productSlug = req.params.slug;
        //let product = ProductModel.findByField('slug', productSlug);
        const product = ProductModel.findBySlug(productSlug);

        product
            .then(product => {
                if (!product) {
                    return res.redirect('/');
                }
                res.render('products/show', {
                    product,
                    user: req.session.user || null,
                });
            })
            .catch(err => {
                console.log(err);
            })
        ;      
    }
}

module.exports = productsController;