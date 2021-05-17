const HttpResponse = require('../HttpResponse');
const AuthService = require('../services/AuthService');
const sequelize = require('../config/db');
const passport = require('passport');
const jwtGenerator = require('../utils/jwtGenerator');

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

  async loginUser(req, res, next) {
    passport.authenticate('login-user', async (err, user, info) => {
      try {
        if (!user) {
          return new HttpResponse(info.message, 404).send(req, res);
        }

        if (err) {
          return next(err);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) {
            return next(error);
          }

          //Generate Access and Refresh Tokens
          const body = { id: user.id, role: user.isAdmin ? 'admin' : 'user' };
          const accessToken = jwtGenerator(body);
          const refreshToken = jwtGenerator(body);
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
          });
          return new HttpResponse('Successfully logged in user', 200, {
            accessToken,
          }).send(req, res);
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  }

  refreshToken(req, res) {
    const { accessToken, refreshToken } = req.user;
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    new HttpResponse('Successfully reauthenticated user', 200, { accessToken });
  }
}

module.exports = AuthController;
