"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Image extends Model {
      static associate(models) {}
   }
   Image.init(
      {
         image_url: DataTypes.STRING,
         public_id: DataTypes.STRING,
         name: DataTypes.STRING,
         size: DataTypes.INTEGER,
         link_to: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Image;
};
