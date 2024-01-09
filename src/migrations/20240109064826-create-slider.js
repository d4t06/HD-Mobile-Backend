"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Sliders", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         slider_name: {
            type: Sequelize.TEXT,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Sliders");
   },
};
