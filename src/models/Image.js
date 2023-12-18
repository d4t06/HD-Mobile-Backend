"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Image extends Model {
      static associate(models) {}
   }
   Image.init(
      {
         image_url: DataTypes.STRING,
         image_file_path: DataTypes.STRING,
         name: DataTypes.STRING,
         size: DataTypes.INTEGER,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Image;
};
