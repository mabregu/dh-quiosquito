'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('product_images', [{
      id: 1,
      product_id: 1,
      image_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 2,
      product_id: 2,
      image_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 3,
      product_id: 3,
      image_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 4,
      product_id: 4,
      image_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 5,
      product_id: 5,
      image_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 6,
      product_id: 6,
      image_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 7,
      product_id: 7,
      image_id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 8,
      product_id: 8,
      image_id: 8,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 9,
      product_id: 9,
      image_id: 9,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 10,
      product_id: 9,
      image_id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 11,
      product_id: 9,
      image_id: 11,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 12,
      product_id: 10,
      image_id: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 13,
      product_id: 10,
      image_id: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 14,
      product_id: 10,
      image_id: 14,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 15,
      product_id: 11,
      image_id: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 16,
      product_id: 11,
      image_id: 16,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('product_images', null, {});
  }
};
