'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('currencies', [{
      name: 'USD',
      symbol: '$',
      code: 'USD',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'EUR',
      symbol: '€',
      code: 'EUR',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'GBP',
      symbol: '£',
      code: 'GBP',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'JPY',
      symbol: '¥',
      code: 'JPY',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'ARS',
      symbol: '$',
      code: 'ARS',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
    await queryInterface.bulkInsert('categories', [{
      id: 1,
      name: 'Electronics',
      slug: 'electronics',
      description: 'All electronics',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      name: 'Clothing',
      slug: 'clothing',
      description: 'All clothing',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      name: 'Books',
      slug: 'books',
      description: 'All books',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      name: 'Movies',
      slug: 'movies',
      description: 'All movies',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
    await queryInterface.bulkInsert('Products', [{
      id: 1,
      name: 'Samsung Memory',
      slug: 'samsung-memory',
      price: 10.00,
      description: 'This is Samsung Memory',
      stock: 10,
      currency_id: 1,
      category_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 2,
      name: 'Reloj Blanco',
      slug: 'reloj-blanco',
      price: 20.00,
      description: 'This is product Reloj blanco',
      stock: 20,
      currency_id: 2,
      category_id: 2,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 3,
      name: 'Auriculares',
      slug: 'auriculares',
      price: 30.00,
      description: 'This is product Auriculares',
      stock: 30,
      currency_id: 5,
      category_id: 3,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 4,
      name: 'Gafas de Sol',
      slug: 'gafas-de-sol',
      price: 40.00,
      description: 'This is product Gafas de Sol',
      stock: 40,
      currency_id: 4,
      category_id: 4,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 5,
      name: 'Zapatillas',
      slug: 'zapatillas',
      price: 50.00,
      description: 'This is product Zapatillas',
      stock: 50,
      currency_id: 4,
      category_id: 3,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 6,
      name: 'Alta voz',
      slug: 'alta-voz',
      price: 60.00,
      description: 'This is product Alta voz',
      stock: 60,
      currency_id: 2,
      category_id: 3,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 7,
      name: 'Camara',
      slug: 'camara',
      price: 70.00,
      description: 'This is product Camara',
      stock: 70,
      currency_id: 5,
      category_id: 3,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 8,
      name: 'Joystick',
      slug: 'joystick',
      price: 80.00,
      description: 'Joystick inalambrico xbox blanco',
      stock: 80,
      currency_id: 1,
      category_id: 3,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 9,
      name: 'Termo lumilagro',
      slug: 'termo-lumilagro',
      price: 90.00,
      description: 'Termo lumilagro',
      stock: 90,
      currency_id: 3,
      category_id: 3,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 10,
      name: 'Juego de mesa peliculas chaplin',
      slug: 'juego-de-mesa-peliculas-chaplin',
      price: 100.00,
      description: 'Juego de mesa peliculas chaplin',
      stock: 100,
      currency_id: 4,
      category_id: 4,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }, {
      id: 11,
      name: 'Producto Vanish',
      slug: 'producto-vanish',
      price: 110.00,
      description: 'Producto Vanish',
      stock: 110,
      currency_id: 1,
      category_id: 1,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('currencies', null, {});
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  }
};
