const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

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
        res.render('products/create', {
            currencies: currencyList
        });
    },
    store: (req, res) => {        
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
        let productSlug = req.params.slug;
        let product = productList.find(product => product.slug === productSlug);
        
        res.render('products/edit', {
            product,
            currencies: currencyList
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