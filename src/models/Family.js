const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');

const Family = sequelize.define(
  'Family',
  {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (family, options) => {
        const hashedPassword = await bcrypt.hash(family.password, 10);
        family.password = hashedPassword;
      },
      beforeUpdate: async (family, options) => {
        const hashedPassword = await bcrypt.hash(family.password, 10);
        family.password = hashedPassword;
      },
    },
  }
);

module.exports = Family;
