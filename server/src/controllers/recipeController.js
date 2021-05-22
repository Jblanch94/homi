const RecipeService = require('../services/RecipeService');
const TagService = require('../services/TagService');
const RecipeTagService = require('../services/RecipeTagService');
const FamilyService = require('../services/FamilyService');
const HttpResponse = require('../HttpResponse');

class RecipeController {
  constructor() {
    this.recipeService = new RecipeService();
    this.tagService = new TagService();
    this.recipeTagService = new RecipeTagService();
    this.familyService = new FamilyService();
    this.addRecipe = this.addRecipe.bind(this);
    this.fetchRecipes = this.fetchRecipes.bind(this);
    this.fetchRecipeById = this.fetchRecipeById.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.searchRecipes = this.searchRecipes.bind(this);
  }

  async addRecipe(req, res, next) {
    const { userId, familyId } = req.params;
    const { name, description, tags } = req.body;
    try {
      // validation on provided body parameters
      if (!name || !description) {
        return new HttpResponse('Invalid data provided', false).badRequest(res);
      }

      // create a new recipe with the provided data
      const newRecipe = await this.recipeService.addRecipe(
        req.body,
        familyId,
        userId
      );

      // insert tags into Tag Table
      const recipeTags = await this.tagService.insertTags(tags);

      // insert ids of recipe and tags into RecipeTags Table
      await this.recipeTagService.insertRecipeTags(newRecipe.id, recipeTags);

      new HttpResponse('Successfully created new recipe', true, {
        newRecipe,
        tags,
      }).created(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchRecipes(req, res, next) {
    const { familyId } = req.params;
    try {
      // fetch family by id
      // return not found if family is null
      const family = this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // fetch all recipes for the family id, returning the name and description
      const recipes = this.recipeService.fetchRecipes(familyId);

      new HttpResponse('Successfully retrieved all recipes', true, recipes).ok(
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchRecipeById(req, res, next) {
    const { recipeId } = req.params;
    try {
      // fetch the recipe by id
      // if recipe is null then return not found
      const recipe = await this.recipeService.fetchRecipeById(recipeId);
      if (recipe === null) {
        return new HttpResponse('Recipe not found', false).notFound(res);
      }

      // fetch associated tags with the recipe id
      const tags = this.recipeTagService.fetchRecipeTags(recipeId);

      // return recipe details with tags
      new HttpResponse('Successfully fetched recipe', true, {
        recipe,
        tags,
      }).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteRecipe(req, res, next) {
    const { recipeId, familyId } = req.params;
    try {
      // fetch recipe by id
      // if not found return not found
      const recipe = await this.recipeService.fetchRecipeById(recipeId);
      if (recipe === null) {
        return new HttpResponse('Recipe not found', false).notFound(res);
      }

      // fetch family by id
      // if not found return not found
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // call recipe service to delete recipe
      const recipeRowsDeleted = await this.recipeService.deleteRecipe(
        recipeId,
        familyId
      );
      // return successful if it was deleted
      // otherwise throw error
      if (recipeRowsDeleted <= 0) {
        throw new Error('Could not delete resource');
      }

      new HttpResponse('Successfully deleted recipe', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async editRecipe(req, res, next) {
    const { recipeId, familyId } = req.params;
    try {
      const recipe = await this.recipeService.fetchRecipeById(recipeId);
      if (recipe === null) {
        return new HttpResponse('Recipe not found', false).notFound(res);
      }

      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      await this.recipeService.editRecipe(req.body, recipeId, familyId);

      new HttpResponse('Successfully updated recipe', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async searchRecipes(req, res, next) {
    const { familyId } = req.params;
    const { term } = req.query;
    try {
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      const recipes = await this.recipeService.searchRecipes(term);
      new HttpResponse('Successfully searched for recipes', true, recipes).ok(
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteTag(req, res, next) {
    const { recipeId, tagId } = req.params;
    try {
      const recipe = await this.recipeService.fetchRecipeById(recipeId);
      if (recipe === null) {
        return new HttpResponse('Recipe not found', false).notFound(res);
      }

      const tag = await this.tagService.fetchTagById(tagId);
      if (tag === null) {
        return new HttpResponse('Tag not found', false).notFound(res);
      }

      const recipeTagsDeletedRows = await this.recipeTagService.deleteRecipeTag(
        recipeId,
        tagId
      );
      if (recipeTagsDeletedRows <= 0) {
        throw new Error('Could not remove recipe tag');
      }

      new HttpResponse('Successfully removed tag from recipe', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async addTagToRecipe(req, res, next) {
    const { recipeId } = req.params;
    const { tags } = req.body;
    try {
      const recipe = await this.recipeService.fetchRecipeById(recipeId);
      if (recipe === null) {
        return new HttpResponse('Recipe not found', false).notFound(res);
      }

      const processedTags = await this.tagService.insertTags(tags);
      await this.recipeTagService.insertRecipeTags(recipeId, processedTags);
      new HttpResponse('Successfully added tags to recipe', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = RecipeController;
