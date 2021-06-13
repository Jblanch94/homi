const sequelize = require('../Config/db');
const { Op } = require('sequelize');

class RecipeTagService {
  async insertRecipeTag(recipeId, tagId) {
    const RecipeTags = sequelize.models.RecipeTags;
    const recipeTag = await RecipeTags.create({
      RecipeId: recipeId,
      TagId: tagId,
    });
    return recipeTag;
  }

  async insertRecipeTags(recipeId, tags) {
    console.log('recipeId', recipeId);
    console.log('tags', tags);
    tags.forEach(async (tag) => {
      await this.insertRecipeTag(recipeId, tag.id);
    });
  }

  async deleteRecipeTag(recipeId, tagId) {
    return await sequelize.models.RecipeTags.destroy({
      where: { [Op.and]: [{ RecipeId: recipeId }, { TagId: tagId }] },
    });
  }

  async fetchRecipeTags(recipeId) {
    const RecipeTags = sequelize.models.RecipeTags;
    const recipeTags = await RecipeTags.findAll({
      where: { RecipeId: recipeId },
    });
    return recipeTags;
  }
}

module.exports = RecipeTagService;
