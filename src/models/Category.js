"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Category extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         Category.hasMany(models.Category_Attribute, {
            foreignKey: "category_id",
            sourceKey: "id",
            as: "attributes",
         });

         Category.hasMany(models.PriceRange, {
            foreignKey: "category_id",
            sourceKey: "id",
            as: "price_ranges",
         });

         Category.hasMany(models.Brand, {
            foreignKey: "category_id",
            sourceKey: "id",
            as: "brands",
         });
      }
   }
   Category.init(
      {
         category_ascii: DataTypes.STRING,
         category_name: DataTypes.STRING,
         hidden: DataTypes.INTEGER,
         attribute_order: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Category;
};
