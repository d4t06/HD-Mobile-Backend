"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Products", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         href: {
            type: Sequelize.STRING,
         },
         name: {
            type: Sequelize.STRING,
         },
         category: {
            type: Sequelize.STRING,
         },
         image: {
            type: Sequelize.STRING,
         },
         feature: {
            type: Sequelize.STRING,
         },
         old_price: {
            allowNull: true, //defaul
            type: Sequelize.INTEGER,
         },
         cur_price: {
            type: Sequelize.INTEGER,
         },
         product_label: {
            allowNull: true,
            type: Sequelize.STRING,
         },
         intallment: {
            type: Sequelize.BOOLEAN,
         },
         label: {
            type: Sequelize.STRING,
         },
         gift: {
            type: Sequelize.STRING,
         },
         pre_order: {
            type: Sequelize.STRING,
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
