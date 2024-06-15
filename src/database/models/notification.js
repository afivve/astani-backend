'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
    }
  }
  Notification.init({
    type: DataTypes.STRING,
    message: DataTypes.STRING,
    link: DataTypes.STRING,
    read: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};