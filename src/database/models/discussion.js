'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discussion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Discussion.hasMany(models.DiscussionCommentar, {
        foreignKey: 'Id',
        as: 'commentars'
      })
      Discussion.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
    }
  }
  Discussion.init({
    title: DataTypes.STRING,
    question: DataTypes.STRING,
    urlPhoto: DataTypes.STRING,
    imageFilename: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Discussion',
  });
  return Discussion;
};