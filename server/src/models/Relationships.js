const sequelize = require('../config/db');
const Family = require('./Family');
const User = require('./User');

module.exports = (sequelize) => {
  // Set up Relationship between Families Table and Users Table
  Family.hasMany(User);
  User.belongsTo(Family, { foreignKey: 'FamilyId' });
};
