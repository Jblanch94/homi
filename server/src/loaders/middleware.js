const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

module.exports = function (app, passport) {
  app.use(express.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(errorHandler);
};
