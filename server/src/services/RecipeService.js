const Recipe = require('../models/Recipe');
const { Op } = require('sequelize');

class RecipeService {
  async addRecipe(recipe, familyId, userId) {
    // create new recipe with the provided recipe details and userId
    const newRecipe = await Recipe.create({
      ...recipe,
      UserId: userId,
      FamilyId: familyId,
    });

    return newRecipe;
  }

  async fetchRecipes(familyId) {
    const recipes = await Recipe.findAll({ where: { FamilyId: familyId } });

    return recipes;
  }

  async fetchRecipeById(id) {
    const recipe = await Recipe.findByPk(id);
    return recipe;
  }

  async deleteRecipe(recipeId, familyId) {
    const recipeRowsDeleted = await Recipe.destroy({
      where: { [Op.and]: [{ id: recipeId }, { FamilyId: familyId }] },
    });
    return recipeRowsDeleted;
  }

  async editRecipe(recipe, recipeId, familyId) {
    await Recipe.update(recipe, {
      where: { id: recipeId, FamilyId: familyId },
    });
  }

  async searchRecipes(term) {
    const recipes = await Recipe.findAll({
      where: {
        name: {
          [Op.like]: `${term}%`,
        },
      },
    });

    return recipes;
  }
}

module.exports = RecipeService;
