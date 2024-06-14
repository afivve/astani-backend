'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DiseaseLiteraturs', [
      {
        link: 'https://plantix.net/id/library/plant-diseases/100064/brown-spot-of-rice/',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://id.wikipedia.org/wiki/Hawar',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://plantix.net/id/library/plant-diseases/100064/brown-spot-of-rice/',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://id.wikipedia.org/wiki/Hawar',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://plantix.net/id/library/plant-diseases/100064/brown-spot-of-rice/',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://id.wikipedia.org/wiki/Hawar',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://plantix.net/id/library/plant-diseases/100064/brown-spot-of-rice/',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://id.wikipedia.org/wiki/Hawar',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiseaseLiteraturs', null, {});
    await queryInterface.sequelize.query('ALTER TABLE DiseaseLiteraturs AUTO_INCREMENT = 1');
  }
};
