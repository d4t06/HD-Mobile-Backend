"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category_Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Category_Attribute.init(
    {
      category_id: DataTypes.INTEGER,
      attribute: DataTypes.STRING,
      attribute_ascii: DataTypes.STRING,
      order: DataTypes.INTEGER
    },
    {
      sequelize,
      timestamps: false,
    }
  );
  return Category_Attribute;
};
