"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cart_Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name_ascii: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Carts",
          key: "username",
        },
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      color_ascii: {
        type: Sequelize.STRING,
      },
      storage_ascii: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Cart_Items");
  },
};
