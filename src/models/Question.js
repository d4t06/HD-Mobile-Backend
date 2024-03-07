"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Question.hasOne(models.Answer, {
        sourceKey: "id",
        foreignKey: "q_id",
        as: "reply_data",
     });
    }
  }
  Question.init(
    {
      product_ascii: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      cus_name: DataTypes.STRING,
      content: DataTypes.STRING,
      approve: DataTypes.INTEGER,
      total_like: DataTypes.INTEGER,
    },
    {
      sequelize,
    }
  );
  return Question;
};
