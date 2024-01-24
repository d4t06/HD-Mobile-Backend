"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Product_Sliders", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         slider_id: {
            onDelete: "CASCADE",
            type: Sequelize.INTEGER,
            references: {
               model: "Sliders",
               key: "id",
            },
         },
         product_name_ascii: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            type: Sequelize.STRING,
            references: {
               model: "Products",
               key: "product_name_ascii",
            },
         },
         color_id: {
            type: Sequelize.INTEGER,
            onDelete: "CASCADE",
            references: {
               model: "Product_Colors",
               key: "id",
            },
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Sliders");
   },
};
