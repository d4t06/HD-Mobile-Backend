"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Cart_Item extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Cart_Item.hasOne(models.Product, {
            foreignKey: "product_name_ascii",
            sourceKey: "product_name_ascii",
            as: "product_data",
         });
      }
   }
   Cart_Item.init(
      {
         product_name_ascii: DataTypes.STRING,
         username: DataTypes.STRING,
         amount: DataTypes.INTEGER,
         color_id: DataTypes.INTEGER,
         storage_id: DataTypes.INTEGER,
      },
      {
         sequelize,
      }
   );
   return Cart_Item;
};
