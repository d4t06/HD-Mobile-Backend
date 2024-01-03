"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Slider extends Model {
      static associate(models) {
         Slider.hasMany(models.Slider_Image, {
            sourceKey: "id",
            foreignKey: "slider_id",
            as: "images",
         });
      }
   }
   Slider.init(
      {
         slider_name: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Slider;
};
