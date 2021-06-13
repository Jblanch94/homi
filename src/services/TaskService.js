const Task = require('../models/Task');
const Category = require('../models/Category');
const User = require('../models/User');
const sequelize = require('../config/db');

class TaskService {
  async createTask(task, familyId) {
    return await Task.create({ ...task, FamilyId: familyId });
  }

  async fetchTasks(familyId) {
    return await Task.findAll({
      where: { FamilyId: familyId },
      include: [sequelize.models.Category, sequelize.models.User],
    });
  }

  async fetchTaskById(taskId) {
    return await Task.findOne({
      where: { id: taskId },
      include: [sequelize.models.Category, sequelize.models.User],
    });
  }

  async deleteTask(taskId, familyId) {
    return await Task.destroy({ where: { id: taskId, FamilyId: familyId } });
  }

  async editTask(task, taskDetails) {
    await task.update({
      name: taskDetails.name || task.name,
      notes: taskDetails.notes || task.notes,
      completed: taskDetails.completed || task.completed,
    });
  }
}

module.exports = TaskService;
