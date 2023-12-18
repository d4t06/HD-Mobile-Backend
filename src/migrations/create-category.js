"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Categories", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         category_name_ascii: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
         },
         name: {
            allowNull: false,
            type: Sequelize.STRING,
         }
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Categories");
   },
};
