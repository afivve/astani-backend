'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseSolution extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiseaseSolution.belongsTo(models.Disease, {
        foreignKey: 'diseaseId',
        as: 'disease',
        onDelete: 'CASCADE'
      })
    };
  }
  DiseaseSolution.init({
    action: DataTypes.TEXT,
    diseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiseaseSolution',
  });
  return DiseaseSolution;
};