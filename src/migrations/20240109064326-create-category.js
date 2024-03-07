"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_ascii: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      attribute_order: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      hidden: {
        type: Sequelize.INTEGER,
        validate: {
          isIn: [[0, 1]],
        },
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Categories");
  },
};
