'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '$2b$10$4zeGw77gdkEx5YF0RsDi5uiS/as4lw2kio2LTTm1yUK6mteqWXpZa',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '$2b$10$4zeGw77gdkEx5YF0RsDi5uiS/as4lw2kio2LTTm1yUK6mteqWXpZa',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      name: 'Richard Doe',
      email: 'richard@gmail.com',
      password: '$2b$10$4zeGw77gdkEx5YF0RsDi5uiS/as4lw2kio2LTTm1yUK6mteqWXpZa',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
