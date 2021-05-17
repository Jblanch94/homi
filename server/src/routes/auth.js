const { Router } = require('express');
const AuthController = require('../controllers/authController');
const passport = require('passport');

const router = Router();
const authController = new AuthController();

// Route registers a user for a family
router.post(
  '/family/:familyId/user/register',
  passport.authenticate('register-user', { session: false }),
  authController.registerUser
);

router.post('/family/user/login', authController.loginUser);

router.post(
  '/family/user/refresh-token',
  passport.authenticate('refreshToken', { session: false }),
  authController.refreshToken
);

module.exports = router;
