"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Images", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         link_to: {
            type: Sequelize.STRING,
         },
         image_url: {
            type: Sequelize.STRING,
         },
         public_id: {
            type: Sequelize.STRING,
            unique: true,
         },
         name: {
            type: Sequelize.STRING,
         },
         size: {
            type: Sequelize.INTEGER,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("NOW"),
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Images");
   },
};
