const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Grocery = sequelize.define('Grocery', {
  item: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  bought: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Grocery;
