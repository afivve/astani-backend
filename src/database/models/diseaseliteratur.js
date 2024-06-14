'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseLiteratur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiseaseLiteratur.belongsTo(models.Disease, {
        foreignKey: 'diseaseId',
        as: 'disease',
        onDelete: 'CASCADE'
      })
    }
  }
  DiseaseLiteratur.init({
    link: DataTypes.STRING,
    diseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiseaseLiteratur',
  });
  return DiseaseLiteratur;
};