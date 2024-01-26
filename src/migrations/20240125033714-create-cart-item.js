"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable(
         "Cart_Items",
         {
            id: {
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER,
            },
            product_name_ascii: {
               type: Sequelize.STRING,
            },
            username: {
               type: Sequelize.STRING,
               allowNull: false,
               references: {
                  model: "Users",
                  key: "username",
               },
            },
            amount: {
               type: Sequelize.INTEGER,
            },
            color_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: "Product_Colors",
                  key: "id",
               },
            },
            storage_id: {
               type: Sequelize.INTEGER,
               allowNull: false,
               references: {
                  model: "Product_Storages",
                  key: "id",
               },
            },
            createdAt: {
               allowNull: false,
               type: Sequelize.DATE,
               defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
               allowNull: false,
               type: Sequelize.DATE,
               defaultValue: Sequelize.fn("NOW"),
            },
         },
         {
            uniqueKeys: {
               Cart_Item_unique: {
                  fields: ["color_id", "storage_id", "product_name_ascii", "username"],
               },
            },
         }
      );
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Cart_Items");
   },
};
