"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Slider_Image extends Model {
      static associate(models) {
         Slider_Image.hasOne(models.Image, {
            sourceKey: "image_id",
            foreignKey: "id",
            as: "data",
         });
      }
   }
   Slider_Image.init(
      {
         slider_id: DataTypes.STRING,
         image_id: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Slider_Image;
};
