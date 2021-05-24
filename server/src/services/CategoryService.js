const sequelize = require('../config/db');

class CategoryService {
  async insertCategory(category) {
    const Category = sequelize.models.Category;
    const [category, found] = await Category.findOrCreate({
      where: { title: category },
      defaults: { title: category },
    });
    return category;
  }

  async insertCategories(categories) {
    return categories.map((category) => {
      return this.insertCategory(category);
    });
  }
}

module.exports = CategoryService;
