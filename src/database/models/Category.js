const Category = (sequelize, Sequelize) => {
    const model = sequelize.define('category', {
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
            image: {
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
        },
        {
            timestamps: false,
        }
    );

    model.associate = (models) => {
        model.hasMany(models.products, {
            foreignKey: 'category_id',
            as: 'products'
        });
    }

    return model;
}

module.exports = Category;