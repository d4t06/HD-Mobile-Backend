"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("Questions", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_name_ascii: {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Products",
          key: "product_name_ascii",
        },
      },
      cus_name: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT,
      },
      total_like: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Questions");
  },
};
