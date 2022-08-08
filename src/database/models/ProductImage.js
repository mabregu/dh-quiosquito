const ProductImage = (sequelize, DataTypes) => {
    const model = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Image',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: 'product_images',
    });

    model.associate = (models) => {
        model.belongsTo(models.Products, {
            foreignKey: 'product_id',
            as: 'product'
        });
        model.belongsTo(models.Image, {
            foreignKey: 'image_id',
            as: 'image'
        });
    }

    return model;
}

module.exports = ProductImage;