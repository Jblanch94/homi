const sequelize = require('../config/db');

class AssignedTaskService {
  async assignTaskToUser(taskId, userId) {
    const AssignedTasks = sequelize.models.AssignedTasks;
    await AssignedTasks.create({ TaskId: taskId, UserId: userId });
  }

  async isUserAssignedToTask(taskId, userId) {
    const AssignedTasks = sequelize.models.AssignedTasks;
    const assignedTask = await AssignedTasks.findOne({
      where: { TaskId: taskId, UserId: userId },
    });
    assignedTask === null ? false : true;
  }

  async removeUserFromTask(userId, taskId) {
    await sequelize.models.AssignedTasks.destroy({
      where: { UserId: userId, TaskId: taskId },
    });
  }
}

module.exports = AssignedTaskService;
