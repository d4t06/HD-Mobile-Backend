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
         category_ascii: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         category_name: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         icon: {
            type: Sequelize.STRING,
         },
         default: {
            type: Sequelize.BOOLEAN,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Categories");
   },
};
