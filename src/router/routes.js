const express = require('express');

// const jwtValidateMid = require('../middleware/JwtValidateMid');

const {
  login,
  registerMasyarakat,
  registerPetugas,
} = require('../controller/authController');
const { createBarang, getBarang, deleteBarang } = require('../controller/barangController');
const { getListP, getPetugas } = require('../controller/petugasController');
const routers = express.Router();

// =========================== REGISTER & LOGIN ========================= //
routers.post('/login', login);
routers.post('/register', registerMasyarakat);
routers.post('/registerp', registerPetugas);

// =========================== IMPLEMENTASI JWT MIDDLEWARE ========================= //
// routers.use(jwtValidateMid.jwtValidateMiddleware);

// =========================== PTS FE & BE ========================= //
// routers.get('/list/masyarakat', getListMasyaraka);
// routers.get('/list/petugas', getListPetugas);

routers.post('/create/barang', createBarang)
routers.get('/list/barang', getBarang)
routers.delete('/delete/barang/:id', deleteBarang)

routers.get('/list/petugas', getPetugas)

module.exports = routers;
