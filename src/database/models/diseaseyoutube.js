'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseYoutube extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiseaseYoutube.belongsTo(models.Disease, {
        foreignKey: 'diseaseId',
        as: 'disease',
        onDelete: 'CASCADE'
      })
    }
  }
  DiseaseYoutube.init({
    link: DataTypes.STRING,
    diseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiseaseYoutube',
  });
  return DiseaseYoutube;
};