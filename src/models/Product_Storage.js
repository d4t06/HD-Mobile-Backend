"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product_Storage extends Model {
      static associate(models) {
         Product_Storage.hasMany(models.Product_Storage_Color, {
            sourceKey: "storage_ascii",
            foreignKey: "storage_ascii",
            as: "options_data",
         });
      }
   }
   Product_Storage.init(
      {
         product_name_ascii: DataTypes.STRING,
         storage_ascii: DataTypes.STRING,
         storage: DataTypes.STRING,
         base_price: DataTypes.INTEGER,
         default: DataTypes.BOOLEAN,
      },
      {  
         sequelize,
         timestamps: false,
      }
   );
   return Product_Storage;
};
