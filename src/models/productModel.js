const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const ProductModel = {
    productListPath: path.resolve(__dirname, '../data/products.json'),
    getAll: function () {
        const productList = JSON.parse(fs.readFileSync(this.productListPath, 'utf8'));
        return productList;
    },
    findAll: function () {
        const productList = this.getAll();
        return productList;
    },
    find: function (id) {
        const productList = this.getAll();
        const product = productList.find(product => product.id == id);
        return product;
    },
    findByField: function (field, value) {
        const productList = this.getAll();
        const product = productList.find(product => product[field] == value);
        return product;
    },
    findAllByField: function (field, value) {
        const productList = this.getAll();
        const products = productList.filter(product => product[field] == value);
        return products;
    },
    create: function (product, images) {
        try {
            let productList = this.findAll();
            let productExists = this.findByField('name', product.name);
            if (productExists) {
                throw new Error('Product already exists');
            }
            //console.log("create product", images);
            let imagesArray = [];
            if (images) {
                imagesArray = images.map(image => {
                    return {
                        id: uuid.v4(),
                        url: image.filename
                    }
                });
            }

            let slug = product.name.toLowerCase().replace(/ /g, '-');
            let newProduct = {
                id: uuid.v4(),
                name: product.name,
                slug,
                description: product.description,
                currency: product.currency,
                price: product.price,
                images: imagesArray,
            };
            productList.push(newProduct);
            fs.writeFileSync(this.productListPath, JSON.stringify(productList, null, 2));
            return product;
        } catch (error) {
            return { error, message: 'Error creating product' };
        }
    },
    update: function (id, data) {
        try {
            let currentProduct = this.find(id);
            if (currentProduct) {
                let productList = this.getAll();
                let productIndex = productList.findIndex(product => product.id == id);
                productList[productIndex] = data;
                fs.writeFileSync(this.productListPath, JSON.stringify(productList, null, 2));
            } else {
                return { error: 'Product not found' };
            }
        } catch (error) {
            return { error, message: 'Error updating product' };
        }
    },
    delete: function (id) {
        try {
            let currentProduct = this.find(id);
            if (currentProduct) {
                let productList = this.getAll();
                let productIndex = productList.findIndex(product => product.id == id);
                productList.splice(productIndex, 1);
                fs.writeFileSync(this.productListPath, JSON.stringify(productList, null, 2));
            } else {
                return { error: 'Product not found' };
            }
        } catch (error) {
            return { error, message: 'Error deleting product' };
        }
    }
}

module.exports = ProductModel;