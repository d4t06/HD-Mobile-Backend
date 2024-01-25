"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.Cart_Item, {
        sourceKey: "username",
        foreignKey: "username",
        as: "items",
     });
    }
  }
  Cart.init(
    {
      username: DataTypes.STRING,
      count_item: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
    }
  );
  return Cart;
};
