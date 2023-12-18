"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Brand extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {}
   }
   Brand.init(
      {
         brand_name_ascii: DataTypes.STRING,
         image_url: DataTypes.STRING,
         brand_name: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false
      }
   );
   return Brand;
};
