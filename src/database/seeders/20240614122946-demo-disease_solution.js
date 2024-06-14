'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DiseaseSolutions', [
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        action: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente perspiciatis illo eum.',
        diseaseId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DiseaseSolutions', null, {});
    await queryInterface.sequelize.query('ALTER TABLE DiseaseSolutions AUTO_INCREMENT = 1');
  }
};
