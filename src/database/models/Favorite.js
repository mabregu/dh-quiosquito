const Favorite = (sequelize, Sequelize) => {
    const model = sequelize.define('favorites', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        product_id: {
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
    },
    {
        timestamps: false,
    });

    // model.associate = (models) => {
    //     model.belongsTo(models.users, {
    //         foreignKey: 'user_id',
    //         as: 'users'
    //     });
    //     model.belongsTo(models.products, {
    //         foreignKey: 'product_id',
    //         as: 'Products'
    //     });
    // }

    return model;
}

module.exports = Favorite;