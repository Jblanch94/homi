const sequelize = require('../config/db');
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
    },

    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    validate: {
      startTimeAfterEndTime() {
        if (this.startTime.isAfter(this.endTime)) {
          throw new Error('Start time must be before the end time');
        }
      },

      eventAfterCurrentDate() {
        if (this.date.isBefore(DataTypes.DATE.NOW)) {
          throw new Error('Event must be today or a later date');
        }
      },
    },
  }
);

module.exports = Event;
