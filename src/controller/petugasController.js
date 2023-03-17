const { Op } = require('sequelize');
const checkQuery = require('../utils/queryString');
const PetugasModel = require('../models').petugas;
const models = require('../models');

async function getPetugas(req, res) {
  try {
    let {
      role,
      username,
      namaPetugas,
      page,
      pageSize,
      offset,
    } = req.query;

    let petugas = await PetugasModel.findAndCountAll({
      where: {
        ...(checkQuery(username) && {
          username: {
            [Op.substring]: username,
          },
        }),
        ...(checkQuery(namaPetugas) && {
          hargaAwal: {
            [Op.substring]: namaPetugas,
          },
        }),
      },
      include: [
        {
          model: models.level,
          require: true,
          as: 'role',
          attributes: ['id', 'level'],
          where: {
            ...(checkQuery(role) && {
              level: {
                [Op.substring]: role,
              },
            }),
          },
        },
      ],
      limit: pageSize,
      offset: offset,
    });

    res.json({
      status: 'Success',
      msg: 'petugas OK',
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalData: petugas.count,
      },
      data: petugas,
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
// async function getPetugas(req, res) {
//   try {
//     const {page,pageSize,offSet} = req.query
//     const petugas =  await PetugasModel.findAndCountAll({
//       attributes : {
//           exclude:['createdAt','updateAt']
//       },
     
//   })
//     res.json({
//       status: 'Success',
//       msg: 'barang OK',
//       pageNation: {
//         currentPage: page,
//         pageSize: pageSize,
//         totalData: barang.count,
//       },
//       data: barang,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(401).json({
//       status: 'Fail',
//       msg: 'Gagal mendapatkan barang',
//       err: err.message,
//     });
//   }
// }
module.exports = { getPetugas ,getPetugas};