"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Slider_Image extends Model {
      static associate(models) {}
   }
   Slider_Image.init(
      {
         slider_id: DataTypes.STRING,
         image_url: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Slider_Image;
};
