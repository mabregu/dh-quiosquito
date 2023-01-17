'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      symbol: {
        type: Sequelize.STRING
      },
      precision: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      thousand_separator: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ','
      },
      decimal_separator: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '.'
      },
      swap_currency_symbol: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('currencies');
  }
};