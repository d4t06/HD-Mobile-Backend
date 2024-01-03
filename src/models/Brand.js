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
         category_id: DataTypes.INTEGER,
         brand_ascii: DataTypes.STRING,
         brand_name: DataTypes.STRING,
         image_url: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Brand;
};
