'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barang.hasMany(models.history_lelang, {
        as: "historyLelang",
        foreignKey: "barangId",
      });
      barang.hasMany(models.lelang, {
        as: "lelang",
        foreignKey: "barangId",
      });
    }
  }
  barang.init(
    {
      namaBarang: DataTypes.STRING(25),
      tanggal: DataTypes.DATE,
      hargaAwal: DataTypes.INTEGER(20),
      deskripsiBarang: DataTypes.STRING(100),
    }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};