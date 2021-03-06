const express = require('express');
const sequelize = require('./config/db');
const path = require('path');
const passport = require('passport');
const initRelationships = require('./models/Relationships');
require('./config/passport');
require('./config/cloudinary');

// Middleware
const loadMiddleware = require('./loaders/middleware');

// Routes
const loadRoutes = require('./loaders/routes');

class Startup {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 5000;
    this.baseUrl = '/homi/api/v1';
  }

  async run() {
    // middlewares
    loadMiddleware(express, this.app, passport);

    // routes
    loadRoutes(this.app, this.baseUrl);

    console.log(process.env);

    if (process.env.NODE_ENV === 'production') {
      this.app.use(express.static(path.join(__dirname, '../web/build')));
      this.app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../web', 'build', 'index.html'));
      });
    }

    // run the application on specificed port
    this.app.listen(this.PORT, () => {
      console.log(`Running on port ${this.PORT}`);
    });

    // test that database can connect successfully
    try {
      await sequelize.authenticate();
      initRelationships(sequelize);
      console.log('connection has been made successfully');
      await sequelize.sync();
    } catch (err) {
      console.error('unable to connect to database: ', err);
    }
  }
}

module.exports = Startup;
