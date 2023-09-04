const db = require("../database/models");

const favoriteModel = {
  getFavorites: async function (userId) {
    let favorites = await db.favorites.findAll({
      where: {
        user_id: userId,
      },
    });

    return favorites;
  },
  addFavorite: async function (userId, productId) {
    let favorite = await db.favorites.create({
      user_id: userId,
      product_id: productId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return favorite;
  },
  deleteFavorite: async function (userId, productId) {
    let favorite = await db.favorites.destroy({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });

    return favorite;
  },
};

module.exports = favoriteModel;
