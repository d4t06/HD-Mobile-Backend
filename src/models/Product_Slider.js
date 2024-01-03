"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product_Slider extends Model {
      static associate(models) {
         Product_Slider.hasOne(models.Slider, {
            sourceKey: "slider_id",
            foreignKey: "id",
            as: "slider_data",
         });

         Product_Slider.hasOne(models.Product_Color, {
            sourceKey: "color_id",
            foreignKey: "id",
            as: "color_data",
         });
      }
   }
   Product_Slider.init(
      {
         slider_id: DataTypes.INTEGER,
         product_name_ascii: DataTypes.STRING,
         color_id:  DataTypes.INTEGER,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Product_Slider;
};
