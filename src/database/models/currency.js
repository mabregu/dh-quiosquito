'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Currency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.currency.hasMany(models.products, {
        foreignKey: 'currency_id',
        as: 'products'
      });
    }
  }
  Currency.init({
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'currency',
  });
  return Currency;
};