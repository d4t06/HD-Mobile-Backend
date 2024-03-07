"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Rates", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         product_ascii: {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            type: Sequelize.STRING,
            references: {
               model: "Products",
               key: "product_ascii",
            },
         },
         cus_name: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         content: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         rate: {
            type: Sequelize.INTEGER,
            validate: {
               isIn: [[1, 2, 3, 4, 5]],
            },
            allowNull: false,
         },
         approve: {
            type: Sequelize.INTEGER,
            // when fetch, replace this field with convert_date string
            validate: {
               isIn: [[0, 1]],
            },
            defaultValue: 0,
            allowNull: false,
         },
         date_convert: {
            type: Sequelize.STRING,
         },
         total_like: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
         },
         phone_number: {
            type: Sequelize.STRING,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            // defaultValue: Sequelize.fn("NOW"),
            defaultValue: Sequelize.fn("NOW"),
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            // defaultValue: Sequelize.fn("NOW"),
            defaultValue: Sequelize.fn("NOW"),
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Rates");
   },
};
