class AuthService {
  constructor(sequelize) {
    this.sequelize = sequelize;
  }

  async createFamily(familyData) {
    console.log(familyData);
    // create a new Row in database with Family model
    const Family = this.sequelize.models.Family;
    const newFamily = Family.build(familyData);
    await newFamily.save();
    return newFamily;
  }
}

module.exports = AuthService;
