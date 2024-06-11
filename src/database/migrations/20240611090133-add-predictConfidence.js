'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'PredictHistories',
          'confidence',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        )
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('PredictHistories', 'confidence', { transaction: t }),
      ]);
    });
  }
};
