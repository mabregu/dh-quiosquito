const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const db  = require('../database/models');

const ProductModel = {
    productListPath: path.resolve(__dirname, '../data/products.json'),
    getAll: function () {
        //const productList = JSON.parse(fs.readFileSync(this.productListPath, 'utf8'));
        const productList = db.Products.findAll({
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
        });

        return productList;
    },
    findAll: function () {
        const productList = this.getAll();
        return productList;
    },
    find: function (id) {
        // const productList = this.getAll();
        // const product = productList.find(product => product.id == id);
        const product = db.Products.findByPk(id, {
            include: ['category', 'currency',
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
            }
        });

        return product;
    },
    findBySlug: function (slug) {
        const product = db.Products.findOne({
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
                slug: slug,
                deletedAt: null
            }
        });

        return product;
    },
    findByField: function (field, value) {
        // const productList = this.getAll();
        // const product = productList.find(product => product[field] == value);
        const product = db.Products.findOne({
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
                [field]: value,
                deletedAt: null
            }
        });

        return product;
    },
    findAllByField: function (field, value) {
        const productList = this.getAll();
        const products = productList.filter(product => product[field] == value);
        return products;
    },
    create: function (product, files) {
        try {
            let productData = {
                name: product.name,
                slug: product.name.replace(/ /g, '-').toLowerCase(),
                description: product.description,
                stock: product.stock || 0,
                price: product.price,
                currency_id: product.currency,
                category_id: product.category,
                user_id: product.user || 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            
            let newProduct = db.Products.create(productData);

            newProduct
                .then(product => {
                let lastImageId = db.Image.findAll({
                    order: [['id', 'DESC']],
                    limit: 1
                });

                let imagesArray = [];
                lastImageId.then(lastImage => {
                    let imageId = lastImage[0].id;
                    files.forEach(file => {
                        let imageData = {
                            id: imageId + 1,
                            name: file.originalname,
                            type: file.mimetype,
                            size: file.size,
                            path: '/img/uploads/' + file.filename,
                            product_id: newProduct.id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        };
                        imagesArray.push(imageData);
                        imageId++;
                    });
                    return db.Image.bulkCreate(imagesArray);
                })
                .then(() => {
                    imagesArray.forEach(image => {
                        db.ProductImage.create({
                            product_id: product.id,
                            image_id: image.id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                    })
                    
                    return newProduct;
                })
            })
        } catch (error) {
            return { error, message: 'Error creating product' };
        }
    },
    update: async function (id, data, files) {
        try {
            console.log("************************* Update product *************************");
            let updated = await db.Products.update(data, {
                where: { id }
            });

            console.log("update data", data);

            // images deleted from form
            if (data.images_deleted_id) {
                data.images_deleted_id.forEach(imageId => {
                    db.Image.update({
                        deletedAt: new Date()
                    }, {
                            where: {
                                id: imageId
                            }
                        });
                });
            }

            if (files.length > 0) {
                let lastImageId = db.Image.findAll({
                    order: [['id', 'DESC']],
                    limit: 1
                });

                let imagesArray = [];
                lastImageId.then(lastImage => {
                    let imageId = lastImage[0].id;
                    files.forEach(file => {
                        let imageData = {
                            id: imageId + 1,
                            name: file.originalname,
                            type: file.mimetype,
                            size: file.size,
                            path: '/img/uploads/' + file.filename,
                            product_id: id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        };
                        imagesArray.push(imageData);
                        imageId++;
                    });
                    return db.Image.bulkCreate(imagesArray);
                })
                .then((image) => {
                    console.log(image);
                    imagesArray.forEach(image => {
                        db.ProductImage.create({
                            product_id: id,
                            image_id: image.id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                    })
                    
                    return updated;
                })
            } else {
                return updated;
            }
            
            // updated
            //     .then(() => {
            //         if (files) {
            //             // get last id of images
            //             let lastImageId = db.Image.findAll({
            //                 order: [['id', 'DESC']],
            //                 limit: 1
            //             });
            //             let images = [];

            //             lastImageId
            //                 .then(lastImage => {
            //                     let lastId = lastImage[0].id;
            //                     //console.log("lastId", lastId);
            //                     images = files.map(file => {
            //                         return {
            //                             id: ++lastId,
            //                             name: file.originalname,
            //                             type: file.mimetype,
            //                             size: file.size,
            //                             path: "/img/uploads/" + file.filename,
            //                             createdAt: new Date(),
            //                             updatedAt: new Date(),
            //                             deletedAt: null,
            //                         }
            //                     });

            //                     return db.Image.bulkCreate(images);
            //                 })
            //                 .then(() => {
            //                     images.forEach(image => {
            //                         db.ProductImage.create({
            //                             product_id: id,
            //                             image_id: image.id,
            //                             createdAt: new Date(),
            //                             updatedAt: new Date(),
            //                             deletedAt: null,
            //                         });
            //                     });
            //                 })
            //                 .catch(error => {
            //                     console.log(error);
            //                 })
            //                 .finally(() => {
            //                     console.log("images", images);
            //                 })
            //             ;
            //         }

            //         return true;
            //     })
            // ;
        } catch (error) {
            return { error, message: 'Error updating product' };
        }
    },
    delete: function (id) {
        try {
            let deleted = db.Products.update({
                deletedAt: new Date()
            }, {
                where: {
                    id: id
                }
            });

            return deleted;
        } catch (error) {
            return { 
                error, 
                message: 'Error deleting product',
                success: false
            };
        }
    }
}

module.exports = ProductModel;