'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rate.hasOne(models.Product, {
        sourceKey: "product_ascii",
        foreignKey: "product_ascii",
        as: "product_data",
     });
    }
  }
  Rate.init({
    product_ascii: DataTypes.STRING,
    cus_name: DataTypes.STRING,
    content: DataTypes.STRING,
    rate: DataTypes.NUMBER,
    phone_number: DataTypes.STRING,
    total_like: DataTypes.STRING,
    approve: DataTypes.NUMBER,
    date_convert: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};