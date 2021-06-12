const { Sequelize } = require('sequelize');
require('dotenv').config();

let config;

if (process.env.NODE_ENV === 'production') {
  config = new Sequelize(process.env.DB_URL, {
    logging: (...msg) => console.log(msg),
  });
} else {
  config = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: (...msg) => console.log(msg),
    }
  );
}

const sequelize = config;

module.exports = sequelize;
