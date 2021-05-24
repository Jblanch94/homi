const { Router } = require('express');
const GroceryController = require('../controllers/groceryController');
const passport = require('passport');
const requireAdmin = require('../middlewares/requireAdmin');

const router = Router();
const groceryController = new GroceryController();

// Route for creating a new grocery item
router.post(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  groceryController
);

// Route for fetching all grocery items for a specific family
router.get(
  '/family/:familyId',
  passport.authenticate('authenticate'),
  groceryController.fetchGroceries
);

// Route for deleting a grocery item
router.delete(
  '/:groceryId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  requireAdmin,
  groceryController.deleteGrocery
);

// Route for updating a grocery item
router.patch(
  '/:groceryId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  groceryController.updateGrocery
);

module.exports = router;
