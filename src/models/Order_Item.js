"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Order_Item extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Order_Item.init(
      {
         order_id: DataTypes.INTEGER,
         amount: DataTypes.INTEGER,
         price: DataTypes.INTEGER,
         product_name: DataTypes.STRING,
         color: DataTypes.STRING,
         storage: DataTypes.STRING,
         image_url: DataTypes.STRING,
         slug: DataTypes.STRING,
      },
      {
         sequelize,
         timestamps: false,
      }
   );
   return Order_Item;
};
