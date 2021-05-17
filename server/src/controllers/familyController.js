const HttpResponse = require('../HttpResponse');
const Family = require('../models/Family');
const User = require('../models/User');

class FamilyController {
  async registerFamily(req, res, next) {
    const { name, password } = req.body;
    try {
      // Validate the parameters passed in
      if (!name || !password) {
        return new HttpResponse('Missing name and/or password field', 400).send(
          req,
          res
        );
      }
      // Find a Family object by the name
      const family = await Family.findOne({ where: { name } });

      // Create a new Family object if no family object with the provided name was found
      if (family !== null) {
        return new HttpResponse('Family name already exists!', 400).send(
          req,
          res
        );
      }

      const newFamily = await Family.create(req.body);
      new HttpResponse('Successfully created new family', 201, newFamily).send(
        req,
        res
      );
    } catch (err) {
      return next(err);
    }
  }

  async fetchFamilyById(req, res, next) {
    const { familyId } = req.params;
    try {
      // Get the Family object associated with the provided familyId
      const family = await Family.findByPk(familyId, {
        attributes: { exclude: ['password'] },
      });

      // if no family is found return a not found
      if (family == null) {
        return new HttpResponse('Could not find the provided Family', 404).send(
          req,
          res
        );
      }

      // Fetch User Profile's associated with the familyId
      const users = await User.findAll({
        where: { FamilyId: familyId },
        attributes: ['id', 'FamilyId', 'name', 'profileUrl'],
      });

      const data = { family, users };

      new HttpResponse(
        'Successfully fetched family profile and all associated users',
        200,
        data
      ).send(req, res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async editFamily(req, res, next) {
    const { familyId } = req.params;
    const { name, password } = req.body;
    try {
      const family = await Family.findByPk(familyId);

      if (family == null) {
        return new HttpResponse('Family not found', 404).send(req, res);
      }

      family.update({
        name: name || family.name,
        password: password || family.password,
      });
      await family.save();
      new HttpResponse('Successfully updated Family profile', 200, family).send(
        req,
        res
      );
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = FamilyController;
