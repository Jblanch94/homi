const Birthday = require('../models/Birthday');
const { Op } = require('sequelize');

class BirthdayService {
  async createBirthday({ name, date }, familyId) {
    const newBirthday = await Birthday.create({
      name,
      date,
      FamilyId: familyId,
    });
    return newBirthday;
  }

  async fetchBirthdayById(birthdayId, familyId) {
    const birthday = await Birthday.findOne({
      where: { [Op.and]: [{ id: birthdayId }, { FamilyId: familyId }] },
    });
    return birthday;
  }

  async fetchBirthdays(familyId) {
    const birthdays = await Birthday.findAll({ where: { FamilyId: familyId } });
    return birthdays;
  }

  async deleteBirthday(birthdayId, familyId) {
    const deletedBirthdayCount = await Birthday.destroy({
      where: { [Op.and]: [{ id: birthdayId }, { FamilyId: familyId }] },
    });
    return deletedBirthdayCount;
  }

  async editBirthday({ name, date }, birthday) {
    await birthday.update({
      name: name || birthday.name,
      date: date || birthday.date,
    });
    await birthday.save();
  }
}

module.exports = BirthdayService;
