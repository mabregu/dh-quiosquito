const Product = (sequelize, Sequelize) => {
    const model = sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Categories',
                key: 'id'
            }
        },
        currency_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Currencies',
                key: 'id'
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        deletedAt: {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        timestamps: false,
    }
    );

    model.associate = (models) => {
        model.belongsToMany(models.image, {
            through: models.ProductImage, // ProductImage is the name of the model with the association pivot table
            as: 'images', // images is the alias of the association
            foreignKey: 'product_id', // product_id is the foreign key of the association
            otherKey: 'image_id' // image_id is the other foreign key of the association
        });
        model.belongsTo(models.category, {
            foreignKey: 'category_id',
            as: 'category'
        });
        model.belongsTo(models.currency, {
            foreignKey: 'currency_id',
            as: 'currency'
        });
    }

    return model;
}

module.exports = Product;