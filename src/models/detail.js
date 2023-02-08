"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Detail extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }
   Detail.init(
      {
         key: DataTypes.STRING,
         title: DataTypes.STRING,
         images: DataTypes.TEXT,
         param_image: DataTypes.STRING,
         params: DataTypes.TEXT,
      },
      {
         sequelize,
         modelName: "Detail",
      }
   );
   return Detail;
};
