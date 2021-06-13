const sequelize = require('../Config/db');
const { DataTypes } = require('sequelize');

const Category = sequelize.define('Category', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Category;
