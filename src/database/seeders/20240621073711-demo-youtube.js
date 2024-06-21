'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DiseaseYoutubes', [
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        link: 'https://www.youtube.com/watch?v=WVHDwRxZU2A',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiseaseYoutubes', null, {});
    await queryInterface.sequelize.query('ALTER TABLE DiseaseYoutubes AUTO_INCREMENT = 1');
  }
};
