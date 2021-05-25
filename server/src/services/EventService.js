const Event = require('../models/Event');
const { Op } = require('sequelize');

class EventService {
  async createEvent(event, familyId, userId) {
    return await Event.create({ ...event, Family: familyId, UserId: userId });
  }

  async fetchEventById(eventId) {
    return await Event.findByPk(eventId);
  }

  async deleteEvent(eventId, familyId) {
    return await Event.destroy({
      where: { [Op.and]: [{ id: eventId }, { FamilyId: familyId }] },
    });
  }

  async updateEvent(eventDetails, event) {
    await event.update({
      name: eventDetails.name || event.name,
      description: eventDetails.description || event.description,
      date: eventDetails.date || event.date,
      startTime: eventDetails.startTime || event.startTime,
      endTime: eventDetails.endTime || event.endTime,
    });
  }

  async fetchEvents({ month }, familyId) {
    return await Event.findAll({
      where: {
        [Op.and]: [
          { FamilyId: familyId },
          {
            date: {
              [Op.between]: [new Date(month, (parseInt(month) + 1).toString())],
            },
          },
        ],
      },
    });
  }
}

module.exports = EventService;
