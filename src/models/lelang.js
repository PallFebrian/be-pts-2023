'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      lelang.belongsTo(models.barang, {
        as: "barang",
        foreignKey: "barangId",
      });
      lelang.belongsTo(models.masyarakat, {
        as: "masyarakat",
        foreignKey: "userId",
      });
      lelang.belongsTo(models.petugas, {
        as: "petugas",
        foreignKey: "petugasId",
      });
    }
  }
  lelang.init(
    {
      barangId: DataTypes.INTEGER(11),
      tglLelang: DataTypes.DATE,
      hargaAkhir: DataTypes.INTEGER(20),
      userId: DataTypes.INTEGER(11),
      petugasId: DataTypes.INTEGER(11),
      status: DataTypes.ENUM("dibuka", "ditutup"),
    }, {
    sequelize,
    modelName: 'lelang',
  });
  return lelang;
};