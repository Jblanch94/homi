const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const sequelize = require('./config/db');
const passport = require('passport');
const initRelationships = require('./models/Relationships');
const authRoutes = require('./routes/auth');
require('./config/passport');

class Startup {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 5000;
    this.baseUrl = '/homi/api/v1';
  }

  async run() {
    // middlewares
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(session({ secret: 'jfdsahfkjdsahfklhdsakfl' }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    // routes
    this.app.use(`${this.baseUrl}/auth`, authRoutes);

    // run the application on specificed port
    this.app.listen(this.PORT, () => {
      console.log(`Running on port ${this.PORT}`);
    });

    // test that database can connect successfully
    try {
      await sequelize.authenticate();
      initRelationships(sequelize);
      console.log('connection has been made successfully');
      // await sequelize.sync({ force: true });
    } catch (err) {
      console.error('unable to connect to database: ', err);
    }
  }
}

module.exports = Startup;
