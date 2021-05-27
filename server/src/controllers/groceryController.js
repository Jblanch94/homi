const FamilyService = require('../services/FamilyService');
const GroceryService = require('../services/GroceryService');
const CategoryService = require('../services/CategoryService');
const GroceryCategoriesService = require('../services/GroceryCategoriesService');
const HttpResponse = require('../HttpResponse');

class GroceryController {
  constructor() {
    this.familyService = new FamilyService();
    this.groceryService = new GroceryService();
    this.categoryService = new CategoryService();
    this.groceryCategoriesService = new GroceryCategoriesService();
    this.createGroceryItem = this.createGroceryItem.bind(this);
    this.fetchGroceries = this.fetchGroceries.bind(this);
    this.deleteGrocery = this.deleteGrocery.bind(this);
    this.updateGrocery = this.updateGrocery.bind(this);
  }

  async createGroceryItem(req, res, next) {
    const { familyId } = req.params;
    const { item, categories, quantity } = req.body;
    try {
      if (!item || !quantity) {
        return new HttpResponse('Invalid data provided', false).badRequest(res);
      }

      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // Call Grocery Service to create a new Grocery object
      const grocery = await this.groceryService.createGroceryItem(
        req.body,
        familyId,
        req.user.id
      );

      if (categories) {
        const foundOrCreatedCategories =
          await this.categoryService.insertCategories(categories);
        console.log('categories', foundOrCreatedCategories);
        await this.groceryCategoriesService.insertGroceryCategories(
          grocery.id,
          foundOrCreatedCategories
        );
      }

      // return newly created Grocery Object
      new HttpResponse(
        'Successfully created new grocery item',
        true,
        grocery
      ).created(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchGroceries(req, res, next) {
    const { familyId } = req.params;
    try {
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      const groceries = await this.groceryService.fetchGroceries(familyId);
      new HttpResponse(
        'Successfully fetched all groceries',
        true,
        groceries
      ).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteGrocery(req, res, next) {
    const { familyId, groceryId } = req.params;
    try {
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      const grocery = await this.groceryService.fetchGroceryById(groceryId);
      if (grocery === null) {
        return new HttpResponse('Grocery not found', false).notFound(res);
      }

      const groceryDeletedCount = await this.groceryService.deleteGrocery(
        groceryId,
        familyId
      );
      console.log(groceryDeletedCount);
      if (groceryDeletedCount <= 0) {
        throw new Error('Could not delete resource');
      }

      new HttpResponse('Successfully deleted grocery', false).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateGrocery(req, res, next) {
    const { familyId, groceryId } = req.params;
    try {
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      const grocery = await this.groceryService.fetchGroceryById(groceryId);
      if (grocery === null) {
        return new HttpResponse('Grocery not found', false).notFound(res);
      }

      await this.groceryService.updateGrocery(req.body, groceryId);
      new HttpResponse('Successfully updated grocery', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = GroceryController;
