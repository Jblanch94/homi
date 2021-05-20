const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/db');

const Birthday = sequelize.define('Birthday', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Birthday;
