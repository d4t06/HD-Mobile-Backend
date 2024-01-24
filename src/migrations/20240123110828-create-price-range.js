"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("PriceRanges", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         from: {
            type: Sequelize.INTEGER,
         },
         to: {
            type: Sequelize.INTEGER,
         },
         category_id: {
            type: Sequelize.INTEGER,
            references: {
               model: "Categories",
               key: "id",
            },
         },
         label: {
            type: Sequelize.STRING,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("PriceRanges");
   },
};
