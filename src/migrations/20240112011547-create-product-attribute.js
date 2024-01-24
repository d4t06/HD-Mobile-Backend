"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable(
         "Product_Attributes",
         {
            id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
            },
            category_attr_id: {
               onDelete: "CASCADE",
               onUpdate: "CASCADE",
               type: Sequelize.INTEGER,
               references: {
                  model: "Category_Attributes",
                  key: "id",
               },
            },
            product_name_ascii: {
               onDelete: "CASCADE",
               onUpdate: "CASCADE",
               type: Sequelize.STRING,
               references: {
                  model: "Products",
                  key: "product_name_ascii",
               },
            },
            value: {
               type: Sequelize.STRING,
            },
         },
         {
            uniqueKeys: {
              Product_Attributes_unique: {
                  fields: ["category_attr_id", "product_name_ascii"],
               },
            },
         }
      );
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("Product_Attributes");
   },
};
