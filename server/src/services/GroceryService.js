const sequelize = require('../config/db');

class GroceryService {
  async createGroceryItem(grocery) {
    const newGrocery = await sequelize.models.Grocery.create(grocery);
    return newGrocery;
  }

  async fetchGroceries(familyId) {
    const Grocery = sequelize.models.Grocery;
    return await Grocery.findAll({ where: { FamilyId: familyId } });
  }

  async fetchGroceryById(groceryId) {
    const Grocery = sequelize.models.Grocery;
    return await Grocery.findByPk(groceryId);
  }

  async deleteGrocery(groceryId, familyId) {
    const Grocery = sequelize.models.Grocery;
    return await Grocery.destroy({ id: groceryId, FamilyId: familyId });
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
