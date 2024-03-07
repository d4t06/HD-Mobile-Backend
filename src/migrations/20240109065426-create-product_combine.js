"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable(
         "Product_Combines",
         {
            id: {
               autoIncrement: true,
               primaryKey: true,
               type: Sequelize.INTEGER,
            },
            product_ascii: {
               onDelete: "CASCADE",
               onUpdate: "CASCADE",
               type: Sequelize.STRING,
               allowNull: false,
               references: {
                  model: "Products",
                  key: "product_ascii",
               },
            },
            color_id: {
               onDelete: "CASCADE",
               onUpdate: "CASCADE",
               allowNull: false,
               type: Sequelize.INTEGER,
               references: {
                  model: "Product_Colors",
                  key: "id",
               },
            },
            storage_id: {
               onDelete: "CASCADE",
               onUpdate: "CASCADE",
               allowNull: false,
               type: Sequelize.INTEGER,
               references: {
                  model: "Product_Storages",
                  key: "id",
               },
            },
            price: {
               allowNull: false,
               type: Sequelize.INTEGER,
            },
            quantity: {
               allowNull: false,
               type: Sequelize.INTEGER,
            },
            default: {
               type: Sequelize.BOOLEAN,
            },
         },
         {
            uniqueKeys: {
               check_unique: {
                  fields: ["product_ascii", "storage_id", "color_id"],
               },
            },
         }
      );
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Combines");
   },
};
