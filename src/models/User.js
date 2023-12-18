"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // hasone target is define in a
         User.hasOne(models.Role, {
            sourceKey: "role",
            foreignKey: 'value',
            as: "role_data",
         });
      }
   }
   User.init(
      {
         role: DataTypes.STRING,
         username: DataTypes.STRING,
         password: DataTypes.STRING,
         refresh_token: DataTypes.STRING,
      },
      {
         sequelize,
      }
   );
   return User;
};
