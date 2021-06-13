const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Tag = sequelize.define('Tag', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

module.exports = Tag;
