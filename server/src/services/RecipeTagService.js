const sequelize = require('../config/db');
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
    tags.forEach(async (tag) => {
      await this.insertRecipeTag(recipeId, tag.id);
    });
  }

  async deleteRecipeTag(recipeId, tagId) {
    return await sequelize.models.RecipeTags.destroy({
      where: { [Op.and]: [{ RecipeId: recipeId }, { TagId: tagId }] },
    });
  }
}

module.exports = RecipeTagService;
