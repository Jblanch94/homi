const { Router } = require('express');
const passport = require('passport');
const requireAdmin = require('../middlewares/requireAdmin');
const TaskController = require('../controllers/taskController');

const router = Router();
const taskController = new TaskController();

// Route for creating a new task
router.post(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  taskController.createTask
);

// Route for fetching all tasks for a given family id
router.get(
  '/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  taskController.fetchTasks
);

// Route for fetching task for a given family id and task id
router.get(
  '/:taskId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  taskController.fetchTaskById
);

// Route for deleting a task for a given family id and task id
router.delete(
  '/:taskId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  requireAdmin,
  taskController.deleteTask
);

// Route for updating a task for a given family id
router.patch(
  '/:taskId/family/:familyId',
  passport.authenticate('authenticate', { session: false }),
  taskController.editTask
);

// Route to add a category to a task for a given family id and task id
router.post(
  '/:taskId/family/:familyId/category',
  passport.authenticate('authenticate', { session: false }),
  taskController.addCategoriesToTask
);

// Route to delete a category from a task for a given family id and task id
router.delete(
  '/:taskId/family/:familyId/category/:categoryId',
  passport.authenticate('authenticate', { session: false }),
  taskController.removeCategoryFromTask
);

// Route to remove a user from a task for a given family id and task id
router.delete(
  '/:taskId/family/:familyId/user/:userId',
  passport.authenticate('authenticate', { session: false }),
  taskController.removeUserFromTask
);

// Route to add a user to a task for a given family id and task id
router.post(
  '/:taskId/family/:familyId/user/:userId',
  passport.authenticate('authenticate', { session: false }),
  taskController.addUserToTask
);

module.exports = router;
