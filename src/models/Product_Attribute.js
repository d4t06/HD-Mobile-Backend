"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Attribute extends Model {
    static associate(models) {
      Product_Attribute.hasOne(models.Category_Attribute, {
        sourceKey: "category_attr_id",
        foreignKey: "id",
        as: "attribute_data",
      });
    }
  }
  Product_Attribute.init(
    {
      category_attr_id: DataTypes.INTEGER,
      product_ascii: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      timestamps: false,
    }
  );
  return Product_Attribute;
};
