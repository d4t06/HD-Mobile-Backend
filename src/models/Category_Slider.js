"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Category_Slider extends Model {
      static associate(models) {
         Category_Slider.hasOne(models.Slider, {
            sourceKey: "slider_id",
            foreignKey: "id",
            as: "slider_data",
         });

         Category_Slider.hasOne(models.Category, {
            sourceKey: "category_id",
            foreignKey: "id",
            as: "category_data",
         });
      }
   }
   Category_Slider.init(
      {
         slider_id: DataTypes.INTEGER,
         category_id: DataTypes.INTEGER
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Category_Slider;
};
