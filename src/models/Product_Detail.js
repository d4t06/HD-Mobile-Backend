"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Product_Detail extends Model {
      static associate(models) {}
   }

   Product_Detail.init(
      {
         product_ascii: DataTypes.STRING,
         content: DataTypes.TEXT,
      },
      {
         sequelize,
         timestamps: false,
      }
   );

   return Product_Detail;
};
