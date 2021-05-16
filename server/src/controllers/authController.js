const HttpResponse = require('../HttpResponse');
const AuthService = require('../services/AuthService');
const sequelize = require('../config/db');

class AuthController {
  async createFamily(req, res) {
    // check all parameters required
    if (!req.body.name || !req.body.password) {
      return new HttpResponse('Missing information', 400).send(req, res);
    }

    // call auth service to Create a new Family object with given parameters
    const authService = new AuthService(sequelize);

    try {
      const newFamily = await authService.createFamily(req.body);
      new HttpResponse('Successfully created new Family', 201, newFamily).send(
        req,
        res
      );
    } catch (err) {
      console.error(err);

      // if there is an error then send the error back
      if (err.errors.length > 0) {
        return new HttpResponse(err.errors[0].message, 400).send(req, res);
      }

      // otherwise send back a generic server error
      new HttpResponse('Server Error', 500).send(req, res);
    }
  }

  registerUser(req, res) {
    new HttpResponse('Successfully created user', 201, req.user).send(req, res);
  }
}

module.exports = AuthController;
