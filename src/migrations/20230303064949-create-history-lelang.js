'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('history_lelangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lelangId: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "lelangs",
          key: "id",
          as: "lelangId"
        }
      },
      barangId: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "barangs",
          key: "id", 
          as: "barangId"
        }
      },
      userId: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: "masyarakats",
          key: "id",
          as: "userId"
        }
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
    await queryInterface.dropTable('history_lelangs');
  }
};