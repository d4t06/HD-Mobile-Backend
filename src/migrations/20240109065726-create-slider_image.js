"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Slider_Images", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         slider_id: {
            onDelete: "CASCADE",
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Sliders",
               key: "id",
            },
         },
         image_url: {
            type: Sequelize.STRING,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Slider_Images");
   },
};
