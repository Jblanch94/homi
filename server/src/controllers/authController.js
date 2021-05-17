const HttpResponse = require('../HttpResponse');
const AuthService = require('../services/AuthService');
const sequelize = require('../config/db');
const passport = require('passport');
const jwtGenerator = require('../utils/jwtGenerator');

class AuthController {
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
