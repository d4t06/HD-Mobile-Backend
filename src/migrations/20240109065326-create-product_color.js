"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Product_Colors", {
         id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         product_name_ascii: {
            type: Sequelize.STRING,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
               model: "Products",
               key: "product_name_ascii",
            },
         },
         color_ascii: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         color: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         default: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Colors");
   },
};
