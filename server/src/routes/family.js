const { Router } = require('express');
const passport = require('passport');
const Familycontroller = require('../controllers/familyController');
const requireAdmin = require('../middlewares/requireAdmin');

const router = Router();
const familyController = new Familycontroller();

// Route for creating a new family
router.post('/', familyController.registerFamily);

// Route to fetch a family by id
router.get(
  '/:familyId',
  passport.authenticate('authenticate', { session: false }),
  familyController.fetchFamilyById
);

// Route to update a family, requires authentication and admin status
router.patch(
  '/:familyId',
  passport.authenticate('authenticate', { session: false }),
  requireAdmin,
  familyController.editFamily
);

// Router for deleting a family, requires authentication and admin status
router.delete(
  '/:familyId',
  passport.authenticate('authenticate', { session: false }),
  requireAdmin,
  familyController.deleteFamily
);

module.exports = router;
