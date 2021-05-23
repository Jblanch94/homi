const { Router } = require('express');
const passport = require('passport');
const RecipeController = require('../controllers/recipeController');

const router = Router();
const recipeController = new RecipeController();

// Route for adding a new recipe
router.post(
  '/family/:familyId/user/:userId',
  passport.authenticate('authenticate', { session: false }),
  recipeController.addRecipe
);

// Route for fetching all recipes for a specified family id
router.get(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  recipeController.fetchRecipes
);

// Route for fetching a recipe by id
router.get(
  '/:recipeId',
  passport.authenticate('authenticate', { session: false }),
  recipeController.fetchRecipeById
);

// Route for deleting a recipe
router.delete(
  '/:recipeId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  recipeController.deleteRecipe
);

// Route for updating a recipe
router.patch(
  '/:recipeId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  recipeController.editRecipe
);

// Route for deleting a tag from the recipe
router.delete(
  '/:recipeId/tag/:tagId',
  passport.authenticate('authenticate', { session: false }),
  recipeController.deleteTag
);

// Route for adding a tag to a recipe
router.post(
  '/:recipeId/tag',
  passport.authenticate('authenticate', { session: false }),
  recipeController.addTagToRecipe
);

module.exports = router;
