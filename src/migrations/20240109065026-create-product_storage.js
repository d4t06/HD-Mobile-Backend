"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("Product_Storages", {
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
         storage_ascii: {
            type: Sequelize.STRING,
            allowNull: false,
         },
         storage: {
            allowNull: false,
            type: Sequelize.STRING,
         },
         base_price: {
            allowNull: false,
            type: Sequelize.INTEGER,
         },
         default: {
            type: Sequelize.BOOLEAN,
         },
      },
      {
         uniqueKeys: {
            check_unique: {
               fields: ["product_name_ascii", "storage_ascii"],
            },
         },
      }
      );
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Storages");
   },
};
