const sequelize = require('../Config/db');
const { DataTypes } = require('sequelize');

const Event = sequelize.define(
  'Event',
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
  },
  {
    validate: {
      startTimeAfterEndTime() {
        if (this.startTime > this.endTime) {
          throw new Error('Start time must be before end time');
        }
      },
    },
  }
);

module.exports = Event;
