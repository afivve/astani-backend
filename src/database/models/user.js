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
        as: 'history'
      })
      User.hasMany(models.Discussion, {
        foreignKey: 'userId',
        as: 'discussion'
      })
      User.hasMany(models.DiscussionCommentar, {
        foreignKey: 'userId',
        as: 'commentar'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    city: DataTypes.STRING,
    province: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    subscriptionType: DataTypes.STRING,
    role: DataTypes.STRING,
    googleId: DataTypes.STRING,
    resetToken: DataTypes.STRING,
    photoProfile: DataTypes.STRING,
    imageFilename: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};