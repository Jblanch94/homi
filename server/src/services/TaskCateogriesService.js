const sequelize = require('../config/db');

class TaskCategoriesService {
  async insertTaskCategories(taskId, categories) {
    for (let i = 0; i < categories.length; i++) {
      await this.insertTaskCategory(taskId, categories[i].id);
    }
  }

  async insertTaskCategory(taskId, categoryId) {
    const TaskCategories = sequelize.models.TaskCategories;
    await TaskCategories.create({ TaskId: taskId, CategoryId: categoryId });
  }

  async removeTaskCategory(taskId, categoryId) {
    return await sequelize.models.TaskCategories.destroy({
      where: { TaskId: taskId, CategoryId: categoryId },
    });
  }
}

module.exports = TaskCategoriesService;
