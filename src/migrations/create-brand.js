"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Brands", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         category_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Categories",
               key: 'id'
            }
         },
         brand_ascii: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
         },
         brand_name: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         image_url: {
            type: Sequelize.STRING,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Brands");
   },
};
