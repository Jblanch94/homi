const sequelize = require('../config/db');
const Family = require('./Family');
const User = require('./User');
const Birthday = require('./Birthday');

module.exports = (sequelize) => {
  // Set up Relationship between Families Table and Users Table
  Family.hasMany(User);
  User.belongsTo(Family, { foreignKey: 'FamilyId' });

  // Set up Relationship between Families Table and Birthdays Table
  Family.hasMany(Birthday);
  Birthday.belongsTo(Family, { foreignKey: 'FamilyId' });
};
