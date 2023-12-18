"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Product_Storage_Colors", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         storage_ascii: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
               model: "Product_Storages",
               key: "storage_ascii",
            },
         },
         color_ascii: {
            unique: true,
            allowNull: false,
            type: Sequelize.STRING,
         },
         color: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         slider_id: {
            type: Sequelize.STRING,
            references: {
               model: 'Sliders',
               key: 'slider_id'
            }
         },
         price: {
            allowNull: false,
            type: Sequelize.INTEGER,
         },
         quantity: {
            allowNull: false,
            type: Sequelize.INTEGER,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Storage_Colors");
   },
};
