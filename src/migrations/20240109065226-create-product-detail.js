"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Product_Details", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         product_ascii: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            references: {
               model: "Products",
               key: "product_ascii",
            },
         },
         content: {
            type: Sequelize.TEXT,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Details");
   },
};
