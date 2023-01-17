'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('currencies', [
      {
        name: 'US Dollar',
        code: 'USD',
        symbol: '$',
        precision: 2,
        thousand_separator: ',',
        decimal_separator: '.',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Euro',
        code: 'EUR',
        symbol: '€',
        precision: 2,
        thousand_separator: '.',
        decimal_separator: ',',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'British Pound',
        code: 'GBP',
        symbol: '£',
        precision: 2,
        thousand_separator: ',',
        decimal_separator: '.',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Japanese Yen',
        code: 'JPY',
        symbol: '¥',
        precision: 0,
        thousand_separator: ',',
        decimal_separator: '.',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Swiss Franc',
        code: 'CHF',
        symbol: 'CHF',
        precision: 2,
        thousand_separator: '\'',
        decimal_separator: '.',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Australian Dollar',
        code: 'AUD',
        symbol: '$',
        precision: 2,
        thousand_separator: ',',
        decimal_separator: '.',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Canadian Dollar',
        code: 'CAD',
        symbol: '$',
        precision: 2,
        thousand_separator: ',',
        decimal_separator: '.',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Swedish Krona',
        code: 'SEK',
        symbol: 'kr',
        precision: 2,
        thousand_separator: ' ',
        decimal_separator: ',',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Argentine Peso',
        code: 'ARS',
        symbol: '$',
        precision: 2,
        thousand_separator: '.',
        decimal_separator: ',',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Brazilian Real',
        code: 'BRL',
        symbol: 'R$',
        precision: 2,
        thousand_separator: '.',
        decimal_separator: ',',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Chilean Peso',
        code: 'CLP',
        symbol: '$',
        precision: 0,
        thousand_separator: '.',
        decimal_separator: ',',
        swap_currency_symbol: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('currencies', null, {});
  }
};
