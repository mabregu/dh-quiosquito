const db = require('../config/db');

const favoriteModel = {
    getFavorites: async function (userId) {
        let favorites = await db.Favorite.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: db.Product,
                    as: 'product',
                    include: [
                        {
                            model: db.Image,
                            as: 'images',
                            attributes: ['id', 'name', 'type', 'size', 'path'],
                            where: {
                                deletedAt: null
                            }
                        }
                    ]
                }
            ]
        });

        return favorites;
    },
    addFavorite: async function (userId, productId) {
        let favorite = await db.Favorite.create({
            user_id: userId,
            product_id: productId
        });

        return favorite;
    },
    deleteFavorite: async function (userId, productId) {
        let favorite = await db.Favorite.destroy({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        return favorite;
    }
}

module.exports = favoriteModel;