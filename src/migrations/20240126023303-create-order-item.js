"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Order_Items", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Orders",
               key: "id",
            },
         },
         product_name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         price: {
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         color: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         storage: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         image_url: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         slug: {
            type: Sequelize.STRING,
            allowNull: false,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Order_Items");
   },
};
