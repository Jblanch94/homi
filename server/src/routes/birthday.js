const { Router } = require('express');
const BirthdayController = require('../controllers/birthdayController');
const passport = require('passport');

const router = Router();
const birthdayController = new BirthdayController();

// Route for creating a new birthday for the given family id
router.post(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  birthdayController.createBirthday
);

// fetch all birthdays for a given family id
router.get(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  birthdayController.fetchBirthdays
);

// delete a birthday for a given family id
router.delete(
  '/:birthdayId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  birthdayController.deleteBirthday
);

// edit a birthday for a given family id
router.patch(
  '/:birthdayId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  birthdayController.editBirthday
);

module.exports = router;
