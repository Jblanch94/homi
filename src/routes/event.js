const { Router } = require("express");
const passport = require("passport");
const EventController = require("../controllers/eventController");
const requireAdmin = require("../middlewares/requireAdmin");

const router = Router();
const eventController = new EventController();

// Route to create a new event
router.post(
  "/family/:familyId",
  passport.authenticate("authenticate", { session: false }),
  eventController.createEvent
);

// Route to fetch all events for a specific month
// router.get(
//   "/family/:familyId",
//   passport.authenticate("authenticate", { session: false }),
//   eventController.fetchEvents
// );

// Route to fetch all events for a specific day
router.get(
  "/family/:familyId",
  passport.authenticate("authenticate", { session: false }),
  eventController.fetchEventsByDay
);

// Route to delete an event
router.delete(
  "/:eventId/family/:familyId",
  passport.authenticate("authenticate", { session: false }),
  requireAdmin,
  eventController.deleteEvent
);

// Route for updating an event
router.patch(
  "/:eventId/family/:familyId",
  passport.authenticate("authenticate", { session: false }),
  eventController.updateEvent
);

module.exports = router;
