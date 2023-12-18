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
            type: Sequelize.STRING,
            allowNull: false,
            references: {
               model: "Sliders",
               key: "slider_id",
            },
         },
         image_id: {
            type: Sequelize.INTEGER,
            references: {
               model: "Images",
            },
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Slider_Images");
   },
};
