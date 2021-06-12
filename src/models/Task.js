const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Task = sequelize.define('Task', {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Task;
