'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
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
    
    await queryInterface.bulkInsert('roles', [
      {
        name: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
