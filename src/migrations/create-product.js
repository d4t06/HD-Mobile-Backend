"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Products", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         product_name_ascii: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
         },
         brand_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "Brands", key: "id" },
         },
         category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "Categories", key: "id" },
         },
         product_name: {
            type: Sequelize.STRING,
         },
         image_url: {
            type: Sequelize.STRING,
         },
         installment: {
            type: Sequelize.BOOLEAN,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Products");
   },
};
