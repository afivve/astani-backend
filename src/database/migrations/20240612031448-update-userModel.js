'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'city',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'province',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'googleId',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'phone',
          {
            type: Sequelize.DataTypes.BIGINT,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'resetToken',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.removeColumn(
          'Users',
          'address',
          { transaction: t },
        ),

      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'city', { transaction: t }),
        queryInterface.removeColumn('Users', 'province', { transaction: t }),
        queryInterface.removeColumn('Users', 'googleId', { transaction: t }),
        queryInterface.removeColumn('Users', 'phone', { transaction: t }),
        queryInterface.removeColumn('Users', 'resetToken', { transaction: t }),
        queryInterface.addColumn('Users', 'address', { transaction: t }),
      ]);
    });
  }
};
