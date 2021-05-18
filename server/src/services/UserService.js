const User = require('../models/User');

class UserService {
  async fetchUserById(userId, familyId) {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ id: userId }, { FamilyId: familyId }],
      },
    });

    if (user === null) {
      return null;
    }

    return user;
  }
}

module.exports = UserService;
