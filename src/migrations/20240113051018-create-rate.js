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
      product_name_ascii: {
        type: Sequelize.STRING,
        references: {
          model: "Products",
          key: "product_name_ascii",
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
      phone_number: {
        type: Sequelize.STRING,
      },
      approve: {
        type: Sequelize.INTEGER,
        validate: {
          isIn: [[0, 1]],
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Rates");
  },
};
