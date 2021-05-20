const FamilyService = require('../services/FamilyService');
const BirthdayService = require('../services/BirthdayService');
const HttpResponse = require('../HttpResponse');

class BirthdayController {
  constructor() {
    this.familyService = new FamilyService();
    this.birthdayService = new BirthdayService();
    this.createBirthday = this.createBirthday.bind(this);
    this.deleteBirthday = this.deleteBirthday.bind(this);
    this.fetchBirthdays = this.fetchBirthdays.bind(this);
    this.editBirthday = this.editBirthday.bind(this);
  }
  async createBirthday(req, res, next) {
    const { name, date } = req.body;
    const { familyId } = req.params;

    try {
      // if name or date are not present return error
      if (!name || !date) {
        return new HttpResponse(
          'Missing birthday information',
          false
        ).badRequest(res);
      }

      // fetch family by id
      // if family is null return not found
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // call birthday service to create a new birthday
      const birthday = await this.birthdayService.createBirthday(
        req.body,
        familyId
      );
      new HttpResponse(
        'Successfully created new birthday',
        true,
        birthday
      ).created(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchBirthdays(req, res, next) {
    const { familyId } = req.params;
    try {
      // fetch family by id
      // if family does not exist then return not found
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // call birthday service to fetch birthdays associated with family id
      const birthdays = await this.birthdayService.fetchBirthdays(familyId);
      new HttpResponse(
        'Successfully fetched all birthdays',
        true,
        birthdays
      ).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteBirthday(req, res, next) {
    const { birthdayId, familyId } = req.params;
    try {
      // fetch family by id
      // if family is not found then return not found
      const family = await this.familyService.fetchFamilyById(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // fetch birthday by id
      // if birthday does not exist then return not found
      const birthday = await this.birthdayService.fetchBirthdayById(
        birthdayId,
        familyId
      );
      if (birthday === null) {
        return new HttpResponse('Birthday does not exist', false).notFound(res);
      }

      // call birthday service to delete specificed birthday
      const deletedBirthdayCount = await this.birthdayService.deleteBirthday(
        birthdayId,
        familyId
      );

      if (deletedBirthdayCount <= 0) {
        new Error('Server Error');
      }

      new HttpResponse('Successfully deleted birthday', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async editBirthday(req, res, next) {
    const { birthdayId, familyId } = req.params;
    try {
      // fetch family by id
      // if family not found then return not found
      const family = await this.familyService.findFamilyByName(familyId);
      if (family === null) {
        return new HttpResponse('Family not found', false).notFound(res);
      }

      // fetch birthday by id
      // if birthday not found then return not found
      const birthday = await this.birthdayService.fetchBirthdayById(
        birthdayId,
        familyId
      );
      if (birthday === null) {
        return new HttpResponse('Birthday not found', false).notFound(res);
      }

      // edit birthday with the given details
      // return successful updated status
      await this.birthdayService.editBirthday(req.body, birthday);
      new HttpResponse('Updated birthday', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = BirthdayController;
