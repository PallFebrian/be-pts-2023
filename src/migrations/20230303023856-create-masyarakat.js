'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('masyarakats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaLengkap: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      telp: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('masyarakats');
  }
};