const sequelize = require('../Config/db');

class CategoryService {
  async insertCategory(category) {
    const Category = sequelize.models.Category;
    const [foundOrCreatedCategory, found] = await Category.findOrCreate({
      where: { title: category },
      defaults: { title: category },
    });
    return foundOrCreatedCategory;
  }

  async insertCategories(categories) {
    return await Promise.all(
      categories.map(async (category) => {
        return await this.insertCategory(category);
      })
    );
  }

  async fetchCategoryById(categoryId) {
    return sequelize.models.Category.findByPk(categoryId);
  }
}

module.exports = CategoryService;
