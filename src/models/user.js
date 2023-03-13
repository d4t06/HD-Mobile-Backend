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
         // belongto target is define in b
         // phai includes trong findOne
         User.belongsTo(models.Role, {
            targetKey: "code",
            foreignKey: "role_code",
            as: "role_data",
         });
      }
   }
   User.init(
      {
         role_code: DataTypes.STRING,
         username: DataTypes.STRING,
         password: DataTypes.STRING,
         avatar: DataTypes.STRING,
         display_name: DataTypes.STRING,
         refresh_token: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "User",
      }
   );
   return User;
};
