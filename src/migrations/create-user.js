"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Users", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         username: {
            type: Sequelize.STRING,
         },
         password: {
            type: Sequelize.STRING,
         },
         avatar: {
            type: Sequelize.STRING,
         },
         display_name: {
            type: Sequelize.STRING,
         },
         role_code: {
            type: Sequelize.STRING,
            defaultValue: "R3",
         },
         refresh_token: {
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
      await queryInterface.dropTable("Users");
   },
};
