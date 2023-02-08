"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Details", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         key: {
            type: Sequelize.STRING,
         },
         title: {
            type: Sequelize.STRING,
         },
         images: {
            type: Sequelize.TEXT,
         },
         param_image: {
            allowNull: true,
            type: Sequelize.STRING,
         },
         params: {
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable("Details");
   },
};
