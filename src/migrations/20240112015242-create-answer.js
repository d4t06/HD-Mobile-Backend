"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Answers", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_ascii: {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Products",
          key: "product_ascii",
        },
      },
      q_id: {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Questions",
          key: "id",
        },
      },
      total_like: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      content: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.fn("NOW"),
        defaultValue: Sequelize.fn("NOW")
      },
      date_convert: {
        type: Sequelize.STRING,
      },
      updatedAt: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.fn("NOW"),
        defaultValue: Sequelize.fn("NOW")

      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("Answers");
  },
};
