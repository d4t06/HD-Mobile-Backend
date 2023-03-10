"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Orders", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: {
            type: Sequelize.STRING,
         },
         gender: {
            type: Sequelize.STRING,
         },
         phone: {
            type: Sequelize.STRING,
         },
         product: {
            type: Sequelize.STRING,
         },
         href: {
            type: Sequelize.STRING,
         },
         price: {
            type: Sequelize.INTEGER,
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
      await queryInterface.dropTable("Orders");
   },
};
