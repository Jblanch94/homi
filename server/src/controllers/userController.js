const HttpResponse = require('../HttpResponse');
const UserService = require('../services/UserService');

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async fetchUserById(req, res, next) {
    const { userId, familyId } = req.params;

    try {
      // call user service to find user by the id provided for user and family
      const user = await this.userService.fetchUserById(userId, familyId);

      // if user is null return a not found status
      if (user === null) {
        return new HttpResponse('User not found', false).notFound();
      }
      // return user details
      new HttpResponse('Successfully fetched user', true, user).ok(req);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchUsersByFamilyId(req, res, next) {}
}

module.exports = UserController;
