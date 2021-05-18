const { Router } = require('express');
const passport = require('passport');
const UserController = require('../controllers/userController');

const router = Router();
const userController = new UserController();

// Fetch a user profile by id for a specific family
router.get(
  '/:userId/family/:familyId',
  passport.authenticate('authenticate', {
    session: false,
  }),
  userController.fetchUserById
);

// Fetch all user profile for family by family id
router.get(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  userController.fetchUsersByFamilyId
);

module.exports = router;
