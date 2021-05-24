const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Grocery = sequelize.define('Grocery', {
  item: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  details: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  bought: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  quantity: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = Grocery;
