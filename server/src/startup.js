const express = require('express');
const sequelize = require('./Config/db');

class Startup {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 5000;
  }

  async run() {
    this.app.use(express.json());
    this.app.listen(this.PORT, () => {
      console.log(`Running on port ${this.PORT}`);
    });
    try {
      await sequelize.authenticate();
      console.log('connection has been made successfully');
    } catch (err) {
      console.error('unable to connect to database: ', err);
    }
  }
}

module.exports = Startup;
