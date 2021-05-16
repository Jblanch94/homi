const { Router } = require('express');
const AuthController = require('../controllers/authController');
const passport = require('passport');

const router = Router();
const authController = new AuthController();

// Route creates a Family object
router.post('/family', authController.createFamily);

// Route registers a user for a family
router.post(
  '/family/:familyId/user/register',
  passport.authenticate('local-register'),
  authController.registerUser
);

router.post(
  '/family/user/login',
  passport.authenticate('local-login'),
  (req, res) => {
    if (req.user) {
      return res.json(req.user);
    }

    res.json('Credentials could not be verified');
  }
);

router.post('/family/user/logout', (req, res) => {
  req.logOut();
  if (!req.isAuthenticated()) {
    return res.json('Logged out ');
  }
  res.json('Could not log out');
});
module.exports = router;
