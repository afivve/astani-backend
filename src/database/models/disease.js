'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Disease.hasMany(models.DiseaseSolution, {
        foreignKey: 'diseaseId',
        as: 'solutions'
      })
    }

  }
  Disease.init({
    name: DataTypes.STRING,
    symtomps: DataTypes.TEXT,
    caused: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};