"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_Attributes", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      category_attr_id: { type: Sequelize.INTEGER },
      product_name_ascii: {
        type: Sequelize.STRING,
        references: {
          model: "Products",
          key: "product_name_ascii",
        },
      },
      value: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_Attributes");
  },
};