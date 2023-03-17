'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history_lelang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      history_lelang.belongsTo(models.masyarakat, {
        as: "masyarakat",
        foreignKey: "userId",
      });
      history_lelang.belongsTo(models.lelang, {
        as: "lelang",
        foreignKey: "lelangId",
      });
      history_lelang.belongsTo(models.barang, {
        as: "barang",
        foreignKey: "barangId",
      });
    }
  }
  history_lelang.init(
    {
      lelangId: DataTypes.INTEGER(11),
      barangId: DataTypes.INTEGER(11),
      userId: DataTypes.INTEGER(11),
      penawaranHarga: DataTypes.INTEGER(20),
    }, {
    sequelize,
    modelName: 'history_lelang',
  });
  return history_lelang;
};