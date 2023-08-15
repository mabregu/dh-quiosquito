const db = require('../database/models');

const favoriteModel = {
    getFavorites: async function (userId) {
        let favorites = await db.Favorites.findAll({
            where: {
                user_id: userId
            }
        });

        return favorites;
    },
    addFavorite: async function (userId, productId) {
        let favorite = await db.Favorites.create({
            user_id: userId,
            product_id: productId,
            created_at: new Date(),
            updated_at: new Date()
        });

        return favorite;
    },
    deleteFavorite: async function (userId, productId) {
        let favorite = await db.Favorites.destroy({
            where: {
                user_id: userId,
                product_id: productId
            }
        });

        return favorite;
    }
}

module.exports = favoriteModel;