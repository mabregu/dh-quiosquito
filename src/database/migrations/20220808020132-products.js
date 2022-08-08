'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.changeColumn('products', 'currency_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'currencies',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('product_images');
    await queryInterface.dropTable('products');
  }
};
