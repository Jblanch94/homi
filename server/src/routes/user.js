const { Router } = require('express');
const passport = require('passport');
const multer = require('multer');
const UserController = require('../controllers/userController');
const requireAdmin = require('../middlewares/requireAdmin');

const router = Router();
const userController = new UserController();
const upload = multer({ dest: 'uploads/' });

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

// Delete user profile for specificed user and family id
router.delete(
  '/:userId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  requireAdmin,
  userController.deleteUserById
);

// Create a new user profile for a new family
router.post(
  '/register/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  requireAdmin,
  upload.single('avatar'),
  userController.registerUser
);

// Update a user's profile
router.patch(
  '/update/:userId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  userController.updateUser
);

module.exports = router;
