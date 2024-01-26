"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Order extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Order.hasMany(models.Order_Item, {
            sourceKey: "id",
            foreignKey: "order_id",
            as: "items",
         });
      }
   }
   Order.init(
      {
         username: DataTypes.STRING,
         status: DataTypes.STRING,
         purchase_price: DataTypes.INTEGER,
         total_price: DataTypes.INTEGER,
         discount: DataTypes.INTEGER,
         purchase_type: DataTypes.STRING,
         recipient_name: DataTypes.STRING,
         recipient_phone_number: DataTypes.STRING,
         recipient_address: DataTypes.STRING,
         deliveredAt: DataTypes.STRING,
         canceledAt: DataTypes.STRING,
      },
      {
         sequelize,
      }
   );
   return Order;
};
