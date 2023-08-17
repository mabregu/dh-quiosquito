const db = require('../database/models');
const ImageModel = require('./imageModel');
const ProductImageModel = require('./productImageModel');

const ProductModel = {
    getAll: function (page = 1) {
        let productList = [];
        productList = db.Products.findAll({
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
            offset: (page - 1) * 12,
            limit: 12
        });
        
        return productList;
    },
    findAll: function () {
        const productList = this.getAll();

        return productList;
    },
    find: async function (id) {
        let product = null;
        try {
            product = await db.Products.findByPk(id, {
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
            
        } catch (error) {
            return error;
        }

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
            let imagesArray = files.map((image) => {
                return {
                    name: image.originalname,
                    type: image.mimetype,
                    size: image.size,
                    path: '/img/uploads/' + image.filename,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });

            let newProduct = db.Products.create(
                {
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
                    images: imagesArray
                }, 
                { include: ['images'] }
            );

            return newProduct;
        } catch (error) {
            return { error, message: 'Error creating product' };
        }
    },
    // api
    store: async (product) => {
        try {
            return await db.Products.create(product, {
                include: ['images']
            });
        } catch (error) {
            return { 
                error, 
                message: 'Error creating product' 
            };
        }
    },
    update: async function (id, data, files) {
        try {
            let updated = await db.Products.update(data, {
                where: { id }
            });

            if (files.length) {
                // add images to the product
                let saveImages = await ImageModel.store(files);
                // add references
                if (saveImages) await ProductImageModel.store(id, saveImages);
            }

            return updated;
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
    },
    search: async (query) => {
        try {
            let products = await db.Products.findAll({
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
                    name: {
                        [db.Sequelize.Op.like]: `%${query}%`
                    },
                    deletedAt: null
                }
            });

            return products;
        } catch (error) {
            return { error, message: 'Error searching products' };
        }
    }
}

module.exports = ProductModel;