'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PriceRange extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PriceRange.init({
    from: DataTypes.INTEGER,
    to: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    label: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false
  });
  return PriceRange;
};