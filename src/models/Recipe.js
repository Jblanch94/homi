const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Recipe = sequelize.define('Recipe', {
  name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  preparation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Recipe;
