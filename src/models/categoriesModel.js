const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const db = require('../database/models');

const CategoryModel = {
    categoryListPath: path.resolve(__dirname, '../data/currencies.json'),
    getAll: function () {
        // const categoryList = JSON.parse(fs.readFileSync(this.categoryListPath, 'utf8'));
        const categoryList = db.Category.findAll({
            where: {
                deletedAt: null
            }
        });

        return categoryList;
    },
    findAll: function () {
        const categoryList = this.getAll();
        return categoryList;
    },
    find: function (id) {
        const categoryList = this.getAll();
        const category = categoryList.find(category => category.id == id);
        return category;
    },
    findByField: function (field, value) {
        const categoryList = this.getAll();
        const category = categoryList.find(category => category[field] == value);
        return category;
    },
    findAllByField: function (field, value) {
        const categoryList = this.getAll();
        const currencies = categoryList.filter(category => category[field] == value);
        return currencies;
    },
    create: function (category) {
        try {
            let categoryList = this.findAll();
            category.id = uuid.v4();
            categoryList.push(category);
            fs.writeFileSync(this.categoryListPath, JSON.stringify(categoryList, null, 2));
            return category;
        } catch (error) {
            return { error, message: 'Error creating category' };
        }
    },
    update: function (id, data) {
        try {
            let currentCurrency = this.find(id);
            if (currentCurrency) {
                let categoryList = this.getAll();
                let categoryIndex = categoryList.findIndex(category => category.id == id);
                categoryList[categoryIndex] = data;
                fs.writeFileSync(this.categoryListPath, JSON.stringify(categoryList, null, 2));
            } else {
                return { error: 'Category not found' };
            }
        } catch (error) {
            return { error, message: 'Error updating category' };
        }
    },
    delete: function (id) {
        try {
            let currentCurrency = this.find(id);
            if (currentCurrency) {
                let categoryList = this.getAll();
                let categoryIndex = categoryList.findIndex(category => category.id == id);
                categoryList.splice(categoryIndex, 1);
                fs.writeFileSync(this.categoryListPath, JSON.stringify(categoryList, null, 2));
            } else {
                return { error: 'Category not found' };
            }
        } catch (error) {
            return { error, message: 'Error deleting category' };
        }
    }
}

module.exports = CategoryModel;