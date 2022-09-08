const ProductModel = require('../../models/productModel');
const productHelper = require('../../helpers/products');
const products = {
    list: async (req, res) => {
        try {
            return res.json({
                success: true,
                data: await ProductModel.findAll() 
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message 
            });
        }
    },
    show: async (req, res) => {
        try {
            return res.json({
                success: true,
                data: await ProductModel.find(req.params.id)
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message 
            });
        }
    },
    store: async (req, res) => {
        try {
            let newProduct = {
                name: req.body.name,
                slug: productHelper.getSlug(req.body.name),
                description: req.body.description,
                stock: req.body.stock || 0,
                price: req.body.price || 0,
                category_id: req.body.category_id || 6, // default sin asignar
                currency_id: req.body.currency_id || 5, // default pesos argentinos
                user_id: req.body.user_id || 1,
                // images: [
                //     {
                //         name: productHelper.getSlug("Sample images"),
                //         type: "image/jpeg",
                //         size: 20983,
                //         path: "/img/uploads/16606095036e2e09.jpg",
                //         createdAt: new Date(),
                //         updatedAt: new Date()
                //     },
                //     {
                //         name: productHelper.getSlug("Second Sample images"),
                //         type: "image/jpeg",
                //         size: 203,
                //         path: "/img/uploads/1660609522209.jpg",
                //         createdAt: new Date(),
                //         updatedAt: new Date()
                //     }
                // ],
                createdAt: new Date(),
                updatedAt: new Date()                
            }

            return res.json({
                data: await ProductModel.store(newProduct)
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message 
            });
        }
    }
}

module.exports = products;