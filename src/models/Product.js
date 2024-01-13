"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class Product extends Model {
      static associate(models) {
         // define association here
         // default use 'DetailId' filed
         Product.hasOne(models.Product_Detail, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "detail",
         });

         Product.hasOne(models.Brand, {
            sourceKey: "brand_id",
            foreignKey: "id",
            as: "brand_data",
         });

         Product.hasOne(models.Category, {
            sourceKey: "category_id",
            foreignKey: "id",
            as: "category_data",
         });

         Product.hasMany(models.Product_Storage, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "storages_data",
         });


         Product.hasMany(models.Product_Color, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "colors_data",
         });

         Product.hasMany(models.Product_Combine, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "combines_data",
         });

         Product.hasMany(models.Product_Slider, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "sliders_data",
         });

         Product.hasMany(models.Product_Attribute, {
            sourceKey: "product_name_ascii",
            foreignKey: "product_name_ascii",
            as: "attributes_data",
         });
      }
   }

   Product.init(
      {
         product_name_ascii: DataTypes.STRING,
         brand_id: DataTypes.STRING,
         category_id: DataTypes.STRING,
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
