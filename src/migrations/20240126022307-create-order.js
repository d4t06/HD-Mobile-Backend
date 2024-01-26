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
         username: {
            type: Sequelize.STRING,
         },
         recipient_name: {
            type: Sequelize.STRING,
         },
         recipient_phone_number: {
            type: Sequelize.STRING,
         },
         recipient_address: {
            type: Sequelize.TEXT,
         },
         purchase_type: {
            type: Sequelize.STRING,
         },
         status: {
            type: Sequelize.STRING,
         },
         purchase_price: {
            type: Sequelize.INTEGER,
         },
         total_price: {
            type: Sequelize.INTEGER,
         },
         discount: {
            type: Sequelize.INTEGER,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("NOW"),
         },
         deliveredAt: {
            type: Sequelize.DATE,
         },
         canceledAt: {
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
