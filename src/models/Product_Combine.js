"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product_Combine extends Model {
      static associate(models) {
         Product_Combine.hasOne(models.Product_Color, {
            sourceKey: "color_id",
            foreignKey: "id",
            as: "color_data",
         });

         Product_Combine.hasOne(models.Product_Storage, {
            sourceKey: "storage_id",
            foreignKey: "id",
            as: "storage_data",
         });
      }
   }
   Product_Combine.init(
      {
         product_ascii: DataTypes.STRING,
         color_id: DataTypes.STRING,
         storage_id: DataTypes.STRING,
         price: DataTypes.INTEGER,
         quantity: DataTypes.INTEGER,
         default: DataTypes.BOOLEAN
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Product_Combine;
};
