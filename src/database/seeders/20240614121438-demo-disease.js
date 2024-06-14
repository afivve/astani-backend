'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Diseases', [
      {
        name: 'Hawar Daun Bakteri',
        symtomps: 'Lorem, ipsum dolor.',
        caused: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic odio eligendi et officiis a fugit optio!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blas',
        symtomps: 'Lorem, ipsum dolor.',
        caused: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic odio eligendi et officiis a fugit optio!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tungro',
        symtomps: 'Lorem, ipsum dolor.',
        caused: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic odio eligendi et officiis a fugit optio!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Bercak Coklat',
        symtomps: 'Lorem, ipsum dolor.',
        caused: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus hic odio eligendi et officiis a fugit optio!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Diseases', null, {});
    await queryInterface.sequelize.query('ALTER TABLE Diseases AUTO_INCREMENT = 1');
  }
};
