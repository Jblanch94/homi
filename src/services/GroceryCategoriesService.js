const sequelize = require('../Config/db');

class GroceryCategoriesService {
  async insertGroceryCategories(groceryId, categories) {
    for (let i = 0; i < categories.length; i++) {
      await this.insertGroceryCategory(groceryId, categories[i].id);
    }
  }

  async insertGroceryCategory(groceryId, categoryId) {
    const GroceryCategories = sequelize.models.GroceryCategories;
    await GroceryCategories.create({
      GroceryId: groceryId,
      CategoryId: categoryId,
    });
  }
}

module.exports = GroceryCategoriesService;
