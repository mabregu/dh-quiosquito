"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "images",
      [
        {
          id: 1,
          name: "samsung-memory",
          type: "avif",
          size: "8",
          path: "/img/uploads/photo-1657214059153-4652d058965f.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 2,
          name: "reloj-blanco",
          type: "avif",
          size: "16",
          path: "/img/uploads/photo-1523275335684-37898b6baf30.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 3,
          name: "auriculares",
          type: "avif",
          size: "32",
          path: "/img/uploads/photo-1505740420928-5e560c06d30e.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 4,
          name: "gafas-de-sol",
          type: "avif",
          size: "14",
          path: "/img/uploads/photo-1572635196237-14b3f281503f.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 5,
          name: "zapatillas",
          type: "jpg",
          size: "8",
          path: "/img/uploads/photo-1542291026-7eec264c27ff.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 6,
          name: "alta-voz",
          type: "jpg",
          size: "16",
          path: "/img/uploads/photo-1543512214-318c7553f230.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 7,
          name: "camara",
          type: "jpg",
          size: "32",
          path: "/img/uploads/photo-1564466809058-bf4114d55352.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 8,
          name: "joystick",
          type: "jpg",
          size: "14",
          path: "/img/uploads/photo-1600080972464-8e5f35f63d08.avif",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 9,
          name: "termo-lumilagro",
          type: "jpg",
          size: "8",
          path: "/img/uploads/1657907512350.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 10,
          name: "termo-lumilagro",
          type: "jpg",
          size: "16",
          path: "/img/uploads/1657907512353.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 11,
          name: "termo-lumilagro",
          type: "jpg",
          size: "32",
          path: "/img/uploads/1657907512355.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 12,
          name: "juego-de-mesa-peliculas-chaplin",
          type: "jpg",
          size: "14",
          path: "/img/uploads/1658699802108.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 13,
          name: "juego-de-mesa-peliculas-chaplin",
          type: "jpg",
          size: "8",
          path: "/img/uploads/1658699802111.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 14,
          name: "juego-de-mesa-peliculas-chaplin",
          type: "jpg",
          size: "16",
          path: "/img/uploads/1658699802112.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 15,
          name: "producto-vanish",
          type: "jpg",
          size: "32",
          path: "/img/uploads/1658758645773.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 16,
          name: "producto-vanish",
          type: "jpg",
          size: "14",
          path: "/img/uploads/1658758645774.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("images", null, {});
  },
};
