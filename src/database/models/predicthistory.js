'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PredictHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PredictHistory.init({
    imageUrl: DataTypes.STRING,
    imageFilename: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    diseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PredictHistory',
  });
  return PredictHistory;
};