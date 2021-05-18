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

  async fetchUsersByFamilyId(familyId) {
    const users = await User.findAll({ where: { FamilyId: familyId } });
    return users;
  }

  async fetchUserByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async deleteUserById(userId, familyId) {
    const userDeleted = await User.destroy({
      where: {
        [Op.and]: [{ id: userId }, { FamilyId: familyId }],
      },
    });

    return userDeleted;
  }

  async registerUser(userDetails, familyId) {
    const user = await User.create({ userDetails, FamilyId: familyId });
    return user;
  }

  async isAdmin(userId, familyId) {
    const user = await this.fetchUserById(userId, familyId);
    return user.isAdmin;
  }

  async updateUser(userDetails, userId, familyId) {
    const user = await this.fetchUserById(userId, familyId);
    const admin = await this.isAdmin(userId, familyId);
    const updatedUser = await User.update({
      email: userDetails.email || email,
      age: userDetails.age || age,
      profileUrl: userDetails.profileUrl || profileUrl,
      isAdmin: admin ? userDetails.isAdmin || isAdmin : isAdmin,
    });
    return updatedUser;
  }
}

module.exports = UserService;
