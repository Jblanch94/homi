const sequelize = require('../config/db');
const Category = require('../models/Category');

class GroceryService {
  async createGroceryItem(grocery, familyId, userId) {
    const newGrocery = await sequelize.models.Grocery.create({
      ...grocery,
      FamilyId: familyId,
      UserId: userId,
    });
    return newGrocery;
  }

  async fetchGroceries(familyId) {
    const Grocery = sequelize.models.Grocery;
    return await Grocery.findAll({
      where: { FamilyId: familyId },
      include: Category,
    });
  }

  async fetchGroceryById(groceryId) {
    const Grocery = sequelize.models.Grocery;
    return await Grocery.findByPk(groceryId);
  }

  async deleteGrocery(groceryId, familyId) {
    const Grocery = sequelize.models.Grocery;
    return await Grocery.destroy({
      where: { id: groceryId, FamilyId: familyId },
    });
  }

  async updateGrocery(data, groceryId) {
    const grocery = await this.fetchGroceryById(groceryId);
    await grocery.update({
      name: data.name || grocery.name,
      quantity: data.quantity || grocery.quantity,
      details: data.details || grocery.details,
      bought: data.bought || grocery.bought,
    });
  }
}

module.exports = GroceryService;
