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
         image_url: {
            type: Sequelize.STRING
         },
         image_file_path: {
            type: Sequelize.STRING
         },
         name: {
            type: Sequelize.STRING
         },
         size: {
            type: Sequelize.INTEGER
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Images");
   },
};
