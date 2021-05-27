const authRoutes = require('../routes/auth');
const familyRoutes = require('../routes/family');
const userRoutes = require('../routes/user');
const birthdayRoutes = require('../routes/birthday');
const recipeRoutes = require('../routes/recipe');
const groceryRoutes = require('../routes/grocery');
const eventRoutes = require('../routes/event');
const taskRoutes = require('../routes/task');

module.exports = function (app, baseUrl) {
  app.use(`${baseUrl}/auth`, authRoutes);
  app.use(`${baseUrl}/family`, familyRoutes);
  app.use(`${baseUrl}/user`, userRoutes);
  app.use(`${baseUrl}/birthday`, birthdayRoutes);
  app.use(`${baseUrl}/recipe`, recipeRoutes);
  app.use(`${baseUrl}/grocery`, groceryRoutes);
  app.use(`${baseUrl}/event`, eventRoutes);
  app.use(`${baseUrl}/task`, taskRoutes);
};
