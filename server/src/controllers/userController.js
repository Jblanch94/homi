const HttpResponse = require('../HttpResponse');
const UserService = require('../services/UserService');
const FamilyService = require('../services/FamilyService');
const cloudinary = require('cloudinary').v2;

class UserController {
  constructor() {
    this.userService = new UserService();
    this.familyService = new FamilyService();
    this.fetchUserById = this.fetchUserById.bind(this);
    this.deleteUserById = this.deleteUserById.bind(this);
    this.fetchUsersByFamilyId = this.fetchUsersByFamilyId.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async fetchUserById(req, res, next) {
    const { userId, familyId } = req.params;

    try {
      // call user service to find user by the id provided for user and family
      const user = await this.userService.fetchUserById(userId, familyId);

      // if user is null return a not found status
      if (user === null) {
        return new HttpResponse('User not found', false).notFound(res);
      }
      // return user details
      new HttpResponse('Successfully fetched user', true, user).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async fetchUsersByFamilyId(req, res, next) {
    const { familyId } = req.params;
    try {
      // call family service to find family by id
      const family = await this.familyService.fetchFamilyById(familyId);

      // if family is null return not found
      if (family === null) {
        return new HttpResponse('Family not found', false).badRequest(res);
      }

      // call user service to find users for a given family id
      const users = await this.userService.fetchUsersByFamilyId(familyId);

      // return associated user profiles
      new HttpResponse(
        'Successfully fetched all user profiles for associated Family',
        true,
        users
      ).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async deleteUserById(req, res, next) {
    const { userId, familyId } = req.params;
    try {
      // call user service to fetch user by id
      const user = await this.userService.fetchUserById(userId, familyId);

      // if user is null return not found
      if (user === null) {
        return new HttpResponse('User not found', false).notFound(res);
      }

      // call user service to delete user by id
      const userDeleted = await this.userService.deleteUserById(
        userId,
        familyId
      );

      // return sucess message if user is deleted
      if (userDeleted <= 0) {
        throw new Error('User could not be deleted');
      }

      new HttpResponse('Successfully deleted user', true).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async registerUser(req, res, next) {
    const { email } = req.body;
    const { familyId } = req.params;

    try {
      // check if user already exists
      // if user exists return user already exsits
      const user = await this.userService.fetchUserByEmail(email);
      if (user !== null) {
        return new HttpResponse('Email already exists', false).badRequest(res);
      }

      // take the image and upload it
      const imageUrl = await cloudinary.uploader.upload(req.file, {
        public_id: 'Homi/development',
      });

      console.log(imageUrl);

      // register user with family with provided details
      // return new user created
      const newUser = await this.userService.registerUser(
        { ...req.body, profileUrl: imageUrl },
        familyId
      );

      if (newUser === null) {
        throw new Error('User could not be created');
      }

      new HttpResponse('Successfully created user', true, newUser).created(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async updateUser(req, res, next) {
    const { userId, familyId } = req.params;
    try {
      console.log(req.user);
      /* 
        Check if user has permissions
        User has permissions if they are an admin or owner of user profile
       */
      const hasPermissions =
        (await this.userService.isAdmin(req.user.id, familyId)) ||
        req.user.id === parseInt(userId);
      if (!hasPermissions) {
        return new HttpResponse('Not Authorized', false).notAuthorized(res);
      }

      const updatedUser = await this.userService.updateUser(
        req.body,
        userId,
        familyId
      );
      new HttpResponse('Successfully updated user', true, updatedUser).ok(res);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = UserController;
