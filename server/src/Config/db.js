const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('homi', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
