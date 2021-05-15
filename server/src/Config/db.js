const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('homi', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  logging: (...msg) => console.log(msg),
});

module.exports = sequelize;
