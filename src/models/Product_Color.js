"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product_Color extends Model {
      static associate(models) {
         // Product_Color.hasOne(models.Slider, {
         //    sourceKey: "slider_id",
         //    foreignKey: "id",
         //    as: "slider_data",
         // });
      }
   }
   Product_Color.init(
      {
         product_name_ascii: DataTypes.STRING,
         color_ascii: DataTypes.STRING,
         color: DataTypes.STRING,
         // slider_id: DataTypes.INTEGER,
         default: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Product_Color;
};
