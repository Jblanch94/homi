const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Family = sequelize.define('Family', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Family;
