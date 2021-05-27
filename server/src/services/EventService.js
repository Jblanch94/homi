const Event = require('../models/Event');
const { Op } = require('sequelize');

class EventService {
  async createEvent(event, familyId, userId) {
    console.log(event);
    return await Event.create({ ...event, FamilyId: familyId, UserId: userId });
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
      title: eventDetails.title || event.title,
      description: eventDetails.description || event.description,
      date: eventDetails.date || event.date,
      startTime: eventDetails.startTime || event.startTime,
      endTime: eventDetails.endTime || event.endTime,
    });
  }

  //TODO:UPDATE TO GET EVENTS FOR A SPECIFIC MONTH
  async fetchEvents({ month }, familyId) {
    return await Event.findAll({
      where: {
        FamilyId: familyId,
        // {
        //   date: {
        //     [Op.between]: [new Date(month, (parseInt(month) + 1).toString())],
        //   },
        // },
      },
    });
  }
}

module.exports = EventService;
