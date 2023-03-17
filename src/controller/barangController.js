const { Dayjs } = require('dayjs');
const dayjs = require('dayjs');
const { Op } = require('sequelize');
const pageNationMidlleware = require('../middleware/pagination');
const barang = require('../models/barang');
const checkQuery = require('../utils/queryString');


const BarangModel = require('../models').barang;

async function createBarang(req, res) {
  let now = dayjs();
  try {
    let { namaBarang, deskripsiBarang, hargaAwal } = req.body;

    await BarangModel.create({
      // id: req.id,
      namaBarang: namaBarang,
      deskripsiBarang: deskripsiBarang,
      hargaAwal: hargaAwal,
      tanggal: now,
    });
    res.status(201).json({
      status: 'Success',
      msg: 'Barang berhasil ditambah',
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      msg: 'Gagal menambah barang',
      t: now,
      err: err.message,
    });
  }
}

async function getBarang(req, res) {
  try {
    const {page,pageSize,offSet} = req.query
    const barang =  await BarangModel.findAndCountAll({
      attributes : {
          exclude:['createdAt','updateAt']
      },
     
  })
    res.json({
      status: 'Success',
      msg: 'barang OK',
      pageNation: {
        currentPage: page,
        pageSize: pageSize,
        totalData: barang.count,
      },
      data: barang,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: 'Fail',
      msg: 'Gagal mendapatkan barang',
      err: err.message,
    });
  }
}
async function deleteBarang(req, res) {
  try {
    const { id } = req.params;
    const barang = await BarangModel.findByPk(id);
    if (barang === null) {
      res.status(404).json({
        status: 'Fail',
        message: 'barang tidak ditemukan',
      });
    }
    if (barang.id != id) {
      return res.status(422).json({
        status: 'Fail',
        message: "artikel is not belong to you, you can't delete it",
      });
    }
    await BarangModel.destroy({
      where: {
        id: id,
      },
    });
    res.json({
      status: 'Success',
      message: 'barang dihapus',
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: 'Fail',
      message: 'ada kesalahan',
    });
  }
}
module.exports = { createBarang, getBarang, deleteBarang };
