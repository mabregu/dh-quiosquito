const Image = (sequelize, Sequelize) => {
    const model = sequelize.define('Image', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        size: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        path: {
            type: Sequelize.STRING,
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
    });

    model.associate = (models) => {
        model.belongsToMany(models.Products, {
            through: models.ProductImage, // ProductImage is the name of the model with the association pivot table
            as: 'products', // products is the alias of the association,
            foreignKey: 'image_id', // image_id is the foreign key of the association
            otherKey: 'product_id' // product_id is the foreign key of the association
        });
    }

    return model;
}

module.exports = Image;