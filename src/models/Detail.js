"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Detail extends Model {
      static associate(models) {}
   }

   Detail.init(
      {
         product_name_ascii: DataTypes.STRING,
         // images: DataTypes.TEXT,
         desc: DataTypes.TEXT,
      },
      {
         sequelize,
         // modelName: "Detail",
      }
   );

   // Detail.belongsTo(Product);

   return Detail;
};
