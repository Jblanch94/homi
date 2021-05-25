const HttpResponse = require('../HttpResponse');
const FamilyService = require('../services/FamilyService');
const EventService = require('../services/EventService');

class EventController {
  constructor() {
    this.familyService = new FamilyService();
    this.eventService = new EventService();
    this.createEvent = this.createEvent.bind(this);
    this.fetchEvents = this.fetchEvents.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  async createEvent(req, res, next) {
    const { familyId } = req.params;
    const { title, description, date, startTime, endTime } = req.body;
    try {
      // validate body of request
      if (!title || !description || !date || !startTime || !endTime) {
        return new HttpResponse('Invalid data provided', false).badRequest(res);
      }

      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // create new event with provided data
      const event = await this.eventService.createEvent(
        req.body,
        familyId,
        req.user.id
      );

      new HttpResponse('Successfully created new event', true, event).created(
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchEvents(req, res, next) {
    const { familyId } = req.params;
    const { month } = req.query;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // call event service to fetch all events with given query parameters
      const events = await this.eventService.fetchEvents(req.query, familyId);
      new HttpResponse('Successfully fetched all events', true, events).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteEvent(req, res, next) {
    const { eventId, familyId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if event exists
      const event = await this.eventService.fetchEventById(eventId);
      if (event === null) {
        return new HttpResponse('Event not found', false).notFound(res);
      }

      // check if user trying to delete the event is creator of event or admin
      if (!(event.UserId === req.user.id || req.user.isAdmin)) {
        return new HttpResponse(
          'You are not allowed to do this',
          false
        ).notAuthorized(res);
      }

      // call event service to delete event
      const eventDeletedCount = await this.eventService.deleteEvent(
        eventId,
        familyId
      );
      if (eventDeletedCount <= 0) {
        throw new Error('Could not delete resource');
      }
      new HttpResponse('Successfully deleted event', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateEvent(req, res, next) {
    const { eventId, familyId } = req.params;
    try {
      // validate family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate event exists
      const event = await this.eventService.fetchEventById(eventId);
      if (event === null) {
        return new HttpResponse('Event not found', false).notFound(res);
      }

      // call event service to update event
      await this.eventService.updateEvent(req.body, event);
      new HttpRespnose('Successfully updated event', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = EventController;
