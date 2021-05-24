const HttpResponse = require('../HttpResponse');
const TaskService = require('../services/TaskService');
const FamilyService = require('../services/FamilyService');
const UserService = require('../services/UserService');
const AssignedTaskService = require('../services/AssignedTaskService');
const CategoryService = require('../services/CategoryService');
const TaskCategoriesService = require('../services/TaskCateogriesService');

class TaskController {
  constructor() {
    this.taskService = new TaskService();
    this.familyService = new FamilyService();
    this.userService = new UserService();
    this.assignedTaskService = new AssignedTaskService();
    this.categoryService = new CategoryService();
    this.taskCategoriesService = new TaskCategoriesService();
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.fetchTaskById = this.fetchTaskById.bind(this);
    this.addCategoriesToTask = this.addCategoriesToTask.bind(this);
    this.removeCategoryFromTask = this.removeCategoryFromTask.bind(this);
    this.removeUserFromTask = this.removeUserFromTask.bind(this);
  }

  async createTask(req, res, next) {
    const { familyId } = req.params;
    const { name, userIds, categories } = req.body;
    try {
      // validate body of the request
      if (!name || !userIds) {
        return new HttpResponse('Invalid data provided', false).badRequest(res);
      }

      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // call Task Service to create new Task
      const task = await this.taskService.createTask(req.body, familyId);

      // call AssignedTask Service to insert user id and task id
      for (let i = 0; i < userIds.length; i++) {
        await this.assignedTaskService.assignTaskToUser(task.id, userIds[i]);
      }

      // if categories call category service to find or create categories then insert into junction table
      if (categories) {
        // call service to create or find categories
        const foundOrCreatedCategories =
          await this.categoryService.insertCategories(categories);

        // call service to insert task and categories in junction table
        await this.taskCategoriesService.insertTaskCategories(
          task.id,
          foundOrCreatedCategories
        );
      }

      new HttpResponse('Successfully created new task', true, task).created(
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchTasks(req, res, next) {
    const { familyId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // fetch tasks associated with family id
      // fetch categories associated with each task
      // fetch users associated with each task
      const tasks = await this.taskService.fetchTasks(familyId);
      new HttpResponse(
        'Successfully fetched all tasks for family',
        true,
        tasks
      ).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchTaskById(req, res, next) {
    const { taskId, familyId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      new HttpResponse('Successfully fetched task', true, task).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteTask(req, res, next) {
    const { taskId, familyId } = req.params;
    try {
      //validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      // call task service to delete task
      const tasksDeletedCount = await this.taskService.deleteTask(
        taskId,
        familyId
      );
      if (tasksDeletedCount <= 0) {
        throw new Error('Could not delete resource');
      }
      new HttpResponse('Successfully deleted task', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async editTask(req, res, next) {
    const { familyId, taskId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      // call service to update task details, notes or completion status
      await this.taskService.editTask(task, req.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addCategoriesToTask(req, res, next) {
    const { taskId, familyId } = req.params;
    const { categories } = req.body;
    try {
      // validate body of request
      if (!categories) {
        return new HttpResponse('Invalid data', false).badRequest(res);
      }

      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      // add categories to task
      // call service to create or find categories
      const foundOrCreatedCategories =
        await this.categoryService.insertCategories(categories);

      // call service to insert task and categories in junction table
      await this.taskCategoriesService.insertTaskCategories(
        task.id,
        foundOrCreatedCategories
      );

      new HttpResponse('Successfully attached categories to task', true).ok(
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async removeCategoryFromTask(req, res, next) {
    const { familyId, taskId, categoryId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      // validate if category exists
      const category = await this.categoryService.fetchCategoryById(catgoryId);
      if (category === null) {
        return new HttpResponse('Category not found', false).notFound(res);
      }

      // call service to remove task and category ids from TaskCategories Table
      const taskCategoryDeletedCount =
        await this.taskCategoriesService.removeTaskCategory(
          task.id,
          category.id
        );

      if (taskCategoryDeletedCount <= 0) {
        throw new Error('Resource could not be deleted');
      }

      new HttpResponse('Successfully removed category from task', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async removeUserFromTask(req, res, next) {
    const { familyId, taskId, userId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      // validate if user exists
      const user = await this.userService.fetchUserById(userId);
      if (user === null) {
        return new HttpResponse('User not found', false).notFound(res);
      }

      // check if user is assigned to task
      const isUserAssignedToTask =
        await this.assignedTaskService.isUserAssignedToTask(task.id, user.id);
      if (!isUserAssignedToTask) {
        return new HttpResponse(
          'User is not assigned to this task',
          false
        ).notFound(res);
      }

      // call service to remove user from task
      const assignedTaskDeletedCount =
        await this.assignedTaskService.removeUserFromTask(userId, taskId);
      if (assignedTaskDeletedCount <= 0) {
        throw new Error('Could not remove resource');
      }
      new HttpResponse('Successfully removed user from task', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addUserToTask(req, res, next) {
    const { familyId, taskId, userId } = req.params;
    try {
      // validate if family exists
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // validate if task exists
      const task = await this.taskService.fetchTaskById(taskId);
      if (task === null) {
        return new HttpResponse('Task not found', false).notFound(res);
      }

      // validate if user exists
      const user = await this.userService.fetchUserById(userId);
      if (user === null) {
        return new HttpResponse('User not found', false).notFound(res);
      }

      // check if user is already assigned to task
      const isUserAssignedToTask =
        await this.assignedTaskService.isUserAssignedToTask(task.id, user.id);

      if (isUserAssignedToTask) {
        return new HttpResponse(
          'User is already assigned to task',
          false
        ).badRequest(res);
      }

      // call service to add user to task
      await this.assignedTaskService.assignTaskToUser(task.id, user.id);
      new HttpResponse('Successfully added user to task', true).created(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = TaskController;
