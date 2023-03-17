const PetugasModel = require('../models').petugas;
const MasyarakatModel = require('../models').masyarakat;
const LevelModel = require('../models').level;
// const sendEmailHandle = require('../mail/index');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
require('dotenv').config();

async function registerMasyarakat(req, res) {
  try {
    let payload = req.body;
    let { namaLengkap, username, password, telp } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);
    await MasyarakatModel.create({
      namaLengkap,
      username,
      telp,
      password: hashPassword,
    });
    res.json({
      status: 'Success',
      message: 'Register Berhasil',
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: 'Fail',
      message: 'Terjadi Kesalahan',
    });
  }
}
async function registerPetugas(req, res) {
  let db_transaction = await sequelize.transaction();
  try {
    const payload = req.body;
    const { namaPetugas, username, password, role } = payload;
    let hashPassword = await bcrypt.hashSync(password, 10);
    const { id } = await LevelModel.create(
      {
        level: role,
      },
      { transaction: db_transaction }
    );
    await PetugasModel.create(
      {
        namaPetugas: namaPetugas,
        username: username,
        password: hashPassword,
        id_level: id,
      },
      { transaction: db_transaction }
    );
    db_transaction.commit();
    res.json({
      status: 'Success',
      message: 'Register Berhasil',
    });
  } catch (err) {
    res.status(403).json({
      status: 'Fail',
      message: 'Terjadi Kesalahan',
      err,
    });
    db_transaction.rollback();
  }
}
async function login(req, res) {
  let { username, password } = req.body;
  try {
    const masyarakat = await MasyarakatModel.findOne({
      where: {
        username: username,
      },
    });
    const petugas = await PetugasModel.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: LevelModel,
          require: true,
          as: 'role',
          attributes: ['id', 'level'],
        },
      ],
    });

    if (masyarakat === null && petugas === null) {
      return res.status(404).json({
        status: 'Fail',
        msg: 'Username tidak ditemukan silahkan register',
      });
    }
    // if (masyarakat.password === null || petugas.password === null) {
    //   return res.status(404).json({
    //     status: 'Fail',
    //     msg: 'Email & Password tidak dicocok',
    //   });
    // }
    if (masyarakat !== null) {
      // const verify = await bcrypt.compareSync(password, masyarakat?.password);
      // console.log(verify);
      // console.log(password)
      // console.log(masyarakat.password)
      // if (!verify) {
      //   return res.status(404).json({
      //     status: 'Fail',
      //     msg: 'Username & Password tidak dicocok',
      //     e: `pw ${password} user ${username}`,
      //   });
      // }

      const token = jwt.sign(
        {
          id: masyarakat?.id,
          username: masyarakat?.username,
          namaLengkap: masyarakat?.namaLengkap,
          telp: masyarakat?.telp,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      res.json({
        status: 'Success',
        msg: 'successfully login',
        token: token,
        user: masyarakat,
      });
    } else {
      // const verify = await bcrypt.compareSync(password, petugas.password);
      // console.log(verify);
      // console.log(password)
      // console.log(petugas.password)
      // if (!verify) {
      //   return res.status(422).json({
      //     status: 422,
      //     msg: 'Username & Password tidak dicocok',
      //   });
      // }

      const token = jwt.sign(
        {
          id: petugas?.id,
          username: petugas?.username,
          namaPetugas: petugas?.namaPetugas,
          role: petugas?.role?.level,
          id_level: petugas?.id_level,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      return res.json({
        status: 'Success',
        msg: 'successfully login',
        token: token,
        user: petugas,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      status: 'Fail',
      message: 'Terjadi Kesalahan',
      err,
    });
  }
}
async function lupaPassword(req, res) {
  try {
    const { email } = req.body;
    //cek apakah user dengan email tsb terdaftar
    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    //jika tidak terdaftar berikan response dengan msg email tidak terdaftar
    if (user === null) {
      return res.status(422).json({
        status: 'fail',
        message: 'Email Tidak Ditemukan, Silahkan Gunakan Email Yang Terdaftar',
      });
    }
    // cek apakah token sudah pernah dibuat pada user tsb di table forgot password
    const currentToken = await forgotPasswords.findOne({
      where: {
        userId: user.id,
      },
    });
    // sudah hapus
    if (currentToken != null) {
      await forgotPasswords.destroy({
        where: {
          userId: user.id,
        },
      });
    }
    // jika belum buat token
    const token = crypto.randomBytes(32).toString('hex');
    const date = new Date();
    const expire = date.setHours(date.getHours() + 1);

    await forgotPasswords.create({
      userId: user.id,
      token: token,
      expireDate: dayjs(expire).format('DD/MM/YYYY HH:mm:ss'),
    });

    const context = {
      link: `${process.env.MAIL_CLIENT_URL}/lupa-password/${user.id}/${token}`,
    };
    const sendEmail = await sendEmailHandle(
      email,
      'Lupa Password',
      'resetPassword',
      context
    );
    if (sendEmail === 'success') {
      res.json({
        status: 'success',
        msg: 'Silahkan Cek Email Anda',
      });
    } else {
      res.status(404).json({
        status: 'Fail',
        msg: 'Gunakan Email Yang Terdaftar',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: 'error 403',
      msg: 'Terjadi Kesalahan',
    });
  }
}

async function resetPassword(req, res) {
  try {
    let { newPassword } = req.body;
    let { userId, token } = req.params;
    const currentToken = await forgotPasswords.findOne({
      where: { userId: userId, token: token },
    });

    const user = await UserModel.findOne({
      where: {
        id: userId,
      },
    });

    if (currentToken === null) {
      res.status(403).json({
        msg: 'token invalid',
      });
    } else {
      // const date = new Date();
      // let date1 = dayjs(currentToken.expiredDate);
      // let date2 = dayjs(date);
      // let difference = date2.diff(date1, 'hour');

      let userExpired = currentToken.expiredDate;
      let expire = dayjs(Date());
      let difference = expire.diff(userExpired, 'hour');
      if (difference !== 0) {
        res.json({
          status: 'Fail',
          msg: 'Token has expired',
        });
      } else {
        let hashPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.update(
          { password: hashPassword },
          {
            where: {
              id: user.id,
            },
          }
        );
        await forgotPasswords.destroy({ where: { token: token } });
        res.json({
          status: '200 OK',
          msg: 'password updated',
        });
      }
    }
  } catch (err) {
    console.log('err', err);
    res.status(403).json({
      status: 'error 403',
      msg: 'ada error',
      err: err,
      // token: currentToken
    });
  }
}
module.exports = {
  registerMasyarakat,
  registerPetugas,
  login,
  lupaPassword,
  resetPassword,
};
