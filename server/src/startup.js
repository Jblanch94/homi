const express = require('express');
const sequelize = require('./config/db');
const initRelationships = require('./models/Relationships');

class Startup {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 5000;
  }

  async run() {
    // middlewares
    this.app.use(express.json());

    // run the application on specificed port
    this.app.listen(this.PORT, () => {
      console.log(`Running on port ${this.PORT}`);
    });

    // test that database can connect successfully
    try {
      await sequelize.authenticate();
      initRelationships(sequelize);
      console.log('connection has been made successfully');
      await sequelize.sync({ force: true });
    } catch (err) {
      console.error('unable to connect to database: ', err);
    }
  }
}

module.exports = Startup;
