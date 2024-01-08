"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Category extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {}
   }
   Category.init(
      {
         category_ascii: DataTypes.STRING,
         category_name: DataTypes.STRING,
         icon: DataTypes.STRING,
         default: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Category;
};
