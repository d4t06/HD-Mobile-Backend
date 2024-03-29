'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Answer.init({
    q_id: DataTypes.INTEGER,
    product_ascii: DataTypes.STRING,
    content: DataTypes.STRING,
    total_like: DataTypes.INTEGER,
    date_convert: DataTypes.STRING
  }, {
    sequelize,
  });
  return Answer;
};