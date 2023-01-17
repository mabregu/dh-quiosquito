'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('abilities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entity: {
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
      }
    });
    
    await queryInterface.bulkInsert('abilities', [
      {
        name: 'create-customer',
        description: 'Create a customer',
        entity: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'read-customer',
        description: 'Read a customer',
        entity: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'update-customer',
        description: 'Update a customer',
        entity: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'delete-customer',
        description: 'Delete a customer',
        entity: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'create-product',
        description: 'Create a product',
        entity: 'product',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'read-product',
        description: 'Read a product',
        entity: 'product',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'update-product',
        description: 'Update a product',
        entity: 'product',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'delete-product',
        description: 'Delete a product',
        entity: 'product',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('abilities');
  }
};
