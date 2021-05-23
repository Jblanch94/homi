const sequelize = require('../config/db');
const Family = require('./Family');
const User = require('./User');
const Birthday = require('./Birthday');
const Recipe = require('./Recipe');
const Tag = require('./Tag');
const Grocery = require('./Grocery');

module.exports = (sequelize) => {
  // Set up Relationship between Families Table and Users Table
  Family.hasMany(User);
  User.belongsTo(Family);

  // Set up Relationship between Families Table and Birthdays Table
  Family.hasMany(Birthday);
  Birthday.belongsTo(Family);

  // Set up Relationship between Recipes Table and Users Table
  User.hasMany(Recipe);
  Recipe.belongsTo(User);

  // Set up Relationship between Recipes Table and Family Table
  Family.hasMany(Recipe);
  Recipe.belongsTo(Family);

  // Set up Relationship between Recipes Table and Tags Table
  Recipe.belongsToMany(Tag, { through: 'RecipeTags' });
  Tag.belongsToMany(Recipe, { through: 'RecipeTags' });

  // Set up Relationship between Grocery Table and User Table
  User.hasMany(Grocery);
  Grocery.belongsTo(User);

  // Set up Relationship between Grocery Table and Family Table
  Family.hasMany(Grocery);
  Grocery.belongsTo(Family);
};
