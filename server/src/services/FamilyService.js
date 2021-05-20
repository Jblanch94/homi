const Family = require('../models/Family');
const User = require('../models/User');

class FamilyService {
  async createFamily(familyData) {
    // create a new Row in database with Family model
    const newFamily = Family.build(familyData);
    await newFamily.save();
    return newFamily;
  }

  async findFamilyByName(name) {
    const family = await Family.findOne({ where: { name } });
    return family;
  }

  async fetchFamilyById(id) {
    const family = await Family.findByPk(id, {
      attributes: { exclude: 'password' },
    });
    if (family === null) return null;

    return family;
  }

  async fetchUsersByFamilyId(id) {
    const users = await User.findAll({
      where: { FamilyId: id },
      attributes: ['id', 'name', 'profileUrl'],
    });
    return users;
  }

  async editFamilyDetails(family, { name }) {
    await family.update({
      name: name || family.name,
    });
    await family.save();
  }

  async deleteFamily(id) {
    await Family.destroy({ where: { id } });
  }
}

module.exports = FamilyService;
