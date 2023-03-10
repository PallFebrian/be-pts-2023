'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      isAvtive: {
        type: Sequelize.BOOLEAN,
        defaultValue : true
      },
      tempatLahir: {
        type: Sequelize.DATEONLY
      },
      tanggalLahir: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('users');
  }
};