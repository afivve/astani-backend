'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.PredictHistory, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    address: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    subscriptionType: DataTypes.STRING,
    role: DataTypes.STRING,
    photoProfile: DataTypes.STRING,
    imageFilename: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};