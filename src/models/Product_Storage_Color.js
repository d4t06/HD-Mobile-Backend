"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product_Storage_Color extends Model {
      static associate(models) {
         Product_Storage_Color.hasOne(models.Slider, {
            sourceKey: "slider_id",
            foreignKey: "slider_id",
            as: "slider_data",
         });
      }
   }
   Product_Storage_Color.init(
      {
         storage_ascii: DataTypes.STRING,
         color_ascii: DataTypes.STRING,
         color: DataTypes.STRING,
         price: DataTypes.INTEGER,
         quantity: DataTypes.INTEGER,
         slider_id : DataTypes.STRING
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Product_Storage_Color;
};
