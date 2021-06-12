const { Sequelize } = require('sequelize');
require('dotenv').config();

const devConfig = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: (...msg) => console.log(msg),
  }
);

const prodConfig = new Sequelize(process.env.DB_URL, {
  logging: (...msg) => console.log(msg),
});

const sequelize =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

module.exports = sequelize;
