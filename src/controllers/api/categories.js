const CategoryModel = require("../../models/categoriesModel");
const common = require("../../helpers/common");
const categories = {
    list: async (req, res) => {
        try {
            return res.json({
                success: true,
                data: await CategoryModel.findAll(),
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message,
            });
        }
    },
    show: async (req, res) => {
        try {
            return res.json({
                success: true,
                data: await CategoryModel.find(req.params.id),
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message,
            });
        }
    },
    store: async (req, res) => {
        try {
            let newCategory = {
                name: req.body.name,
                slug: common.getSlug(req.body.name),
                description: req.body.description,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            return res.json({
                data: await CategoryModel.store(newCategory),
            });
        } catch (error) {
            return res.json({
                success: false,
                error: error.message,
            });
        }
    }
};

module.exports = categories;