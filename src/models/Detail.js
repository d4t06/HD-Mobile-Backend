"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Detail extends Model {
      static associate(models) {}
   }

   Detail.init(
      {
         product_name_ascii: DataTypes.STRING,
         content: DataTypes.TEXT,
      },
      {
         sequelize,
         timestamps: false,
      }
   );

   return Detail;
};
