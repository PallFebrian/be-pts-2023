'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lelangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barangId: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        onUPDATE: 'CASCADE',
        references: {
          model: "barangs",
          key: "id",
          as: "barangId"
        }
      },
      tglLelang: {
        type: Sequelize.DATE,
        allowNull:false
      },
      hargaAkhir: {
        type: Sequelize.INTEGER(20),
        allowNull:false
      },
      userId: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        onUPDATE: 'CASCADE',
        references: {
          model: "masyarakats",
          key: "id",
          as: "userId"
        }
      },
      petugasId: {
        type: Sequelize.INTEGER(11),
        onDelete: 'CASCADE',
        onUPDATE: 'CASCADE',
        references: {
          model: "petugas",
          key: "id",
          as: "petugasId"
        }
      },
      status: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['administrator', 'petugas']
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
    await queryInterface.dropTable('lelangs');
  }
};