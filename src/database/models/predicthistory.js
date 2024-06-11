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
      PredictHistory.belongsTo(models.Disease, {
        foreignKey: 'diseaseId',
        as: 'disease',
        onDelete: 'CASCADE'
      })
      PredictHistory.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
    }
  }
  PredictHistory.init({
    imageUrl: DataTypes.STRING,
    imageFilename: DataTypes.STRING,
    confidence: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    diseaseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PredictHistory',
  });
  return PredictHistory;
};