'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiscussionCommentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DiscussionCommentar.belongsTo(models.Discussion, {
        foreignKey: 'discussionId',
        as: 'discussion',
        onDelete: 'CASCADE'
      })
      DiscussionCommentar.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
      })
    }
  }
  DiscussionCommentar.init({
    commentar: DataTypes.STRING,
    urlPhoto: DataTypes.STRING,
    imageFilename: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    discussionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DiscussionCommentar',
  });
  return DiscussionCommentar;
};