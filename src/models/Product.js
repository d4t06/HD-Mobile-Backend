"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Product extends Model {
      static associate(models) {
         // define association here
         // default use 'DetailId' filed
         Product.hasOne(models.Detail, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "detail",
         });

         Product.hasOne(models.Brand, {
            sourceKey: "brand_name_ascii",
            foreignKey: "brand_name_ascii",
            as: "brand_data",
         });

         Product.hasOne(models.Category, {
            sourceKey: "category_name_ascii",
            foreignKey: "category_name_ascii",
            as: "category_data",
         });

         Product.hasMany(models.Product_Storage, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "storage_data",
         });
      }
   }

   Product.init(
      {
         product_name_ascii: DataTypes.STRING,
         brand_name_ascii: DataTypes.STRING,
         category_name_ascii: DataTypes.STRING,
         product_name: DataTypes.STRING,
         image_url: DataTypes.STRING,
         installment: DataTypes.BOOLEAN,
      },
      {
         sequelize,
      }
   );

   return Product;
};
