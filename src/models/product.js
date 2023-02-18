"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Product extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // hasone target is define in a
         // belongto target is define in b
         Product.belongsTo(models.Detail, {
            targetKey: "key",
            foreignKey: "href",
            as: "data",
         });
         Product.hasOne(models.Demand, {
            targetKey: "href",
            as: "demand"
         })
         // Product.hasOne(models.Detail, {
         //    targetKey: "href",
         //    // foreignKey: "key",
         //    as: "data",
         // });
      }
   }
   Product.init(
      {
         href: DataTypes.STRING,
         brand: DataTypes.STRING,
         name: DataTypes.STRING,
         category: DataTypes.STRING,
         quantity: DataTypes.INTEGER,
         image: DataTypes.STRING,
         feature: DataTypes.STRING,
         old_price: DataTypes.INTEGER,
         cur_price: DataTypes.INTEGER,
         product_label: DataTypes.STRING,
         intallment: DataTypes.BOOLEAN,
         label: DataTypes.STRING,
         gift: DataTypes.STRING,
         pre_order: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: "Product",
      }
   );
   return Product;
};
