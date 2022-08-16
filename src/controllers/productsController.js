const fs = require('fs');
const { validationResult } = require('express-validator');
const CurrencyModel = require('../models/currenciesModel');
const CategoryModel = require('../models/categoriesModel');
const ProductModel = require('../models/productModel');
const productsController = {
    index: (req, res) => {
        res.render('products/index', {
            products: ProductModel.findAll(),
        });
    },
    create: async (req, res) => {
        const currencies = await CurrencyModel.findAll();
        const categories = await CategoryModel.findAll();

        res.render('products/create', {
            currencies, categories,
            user: req.session.user || null,
        });
    },
    store: async (req, res) => {
        try {
            const errors = validationResult(req);
            const currencies = await CurrencyModel.findAll();
            const categories = await CategoryModel.findAll();
    
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
                    currencies, categories,
                });
            }
            
            await ProductModel.create(req.body, req.files);
            
            return res.redirect('/');
        } catch (error) {
            return res.render('products/create', {
                errors: {
                    message: 'Error al crear el producto',
                    detail: error,
                },
                old: req.body,
                currencies, categories,
            });
        }
    },
    edit: async (req, res) => {
        try {
            let productSlug = req.params.slug;
            let product = await ProductModel.findBySlug(productSlug);
            const currencies = await CurrencyModel.findAll();
            const categories = await CategoryModel.findAll();
            
            res.render('products/edit', {
                product,
                currencies, categories,
                user: req.session.user || null,
            });
            
        } catch (error) {
            return res.render('products/edit', {
                errors: {
                    message: 'Error al editar el producto',
                    detail: error,
                },
                user: req.session.user || null,
            });
        }

    },
    update: async (req, res) => {
        try {
            let id = req.body.id;
            
            await ProductModel.update(id, req.body, req.files);

            res.redirect('/');
        } catch (error) {
            res.redirect('/', {
                error: 'Error updating product',
                message: error
            });
        }
    },
    delete: (req, res) => {
        let productSlug = req.params.slug;
        let product = ProductModel.findBySlug(productSlug);

        product
            .then(product => {
                if (!product) {
                    return res.json({
                        success: false,
                        error: 'Product not found'
                    });
                }
                
                ProductModel.delete(product.id);
    
                return res.json({
                    success: true,
                    message: 'Product deleted'
                });
            })
            .catch(error => {
                return res.json({
                    success: false,
                    error: 'Error finding product',
                    message: error
                });
            })
        ;
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