const sequelize = require('sequelize');
const HttpResponse = require('../HttpResponse');
const FamilyService = require('../services/FamilyService');

class FamilyController {
  constructor() {
    this.familyService = new FamilyService(sequelize);
  }
  async registerFamily(req, res, next) {
    const { name, password } = req.body;
    try {
      // Validate the parameters passed in
      if (!name || !password) {
        return new HttpResponse(
          'Missing name and/or password field',
          false
        ).badRequest(res);
      }
      // Find a Family object by the name
      const family = await this.familyService.findFamilyByName(name);

      // Create a new Family object if no family object with the provided name was found
      if (family !== null) {
        return new HttpResponse(
          'Family name already exists!',
          false
        ).badRequest(res);
      }

      const newFamily = await this.familyService.createFamily(req.body);
      new HttpResponse(
        'Successfully created new family',
        true,
        newFamily
      ).created(res);
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }

  async fetchFamilyById(req, res, next) {
    const { familyId } = req.params;
    try {
      // Get the Family object associated with the provided familyId
      const family = await this.familyService.fetchFamilyById(familyId);

      // if no family is found return a not found
      if (family == null) {
        return new HttpResponse(
          'Could not find the provided Family',
          false
        ).notFound(res);
      }

      // Fetch User Profile's associated with the familyId
      const users = await this.familyService.fetchUsersByFamilyId(familyId);

      const data = { family, users };

      new HttpResponse(
        'Successfully fetched family profile and all associated users',
        true,
        data
      ).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async editFamily(req, res, next) {
    const { familyId } = req.params;
    try {
      const family = await this.familyService.fetchFamilyById(familyId);

      if (family == null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      await this.familyService.editFamilyDetails(family, req.body);
      new HttpResponse('Successfully updated Family profile', true, family).ok(
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteFamily(req, res, next) {
    const { familyId } = req.params;
    try {
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family could not be found', false).notFound(
          res
        );
      }

      await this.familyService.deleteFamily(familyId);
      new HttpResponse('Successfully deleted family', true).ok(res);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FamilyController;
