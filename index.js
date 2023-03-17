const express = require('express');
const { sequelize } = require('./src/models');
const routers = require('./src/router/routes');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 1234;
const cors = require("cors")

// const console2 = require('./src/routes/middleware/console2')
app.use(cors())
app.use(express.json());

// app.use(console2)

// app.use(authMiddleWare)
app.use(routers);
app.listen(
  port,
  async () => {
    try {
      await sequelize.authenticate();
      console.log('Koneksi telah berhasil dibuat.');
    } catch (error) {
      console.error('Tidak dapat terhubung ke database.', error);
    }
  },

  console.log(`Server berjalan di http://localhost:${port}`)
);
