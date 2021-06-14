const HttpResponse = require("../HttpResponse");
const passport = require("passport");
const jwtGenerator = require("../utils/jwtGenerator");

class AuthController {
  async registerUser(req, res) {
    new HttpResponse("Successfully created user", true, req.user).created(res);
  }

  async loginUser(req, res, next) {
    passport.authenticate("login-user", async (err, user, info) => {
      try {
        if (!user) {
          return new HttpResponse(info.message, false).notFound(res);
        }

        if (err) {
          return next(err);
        }

        req.login(user, { session: false }, async (error) => {
          if (error) {
            return next(error);
          }

          //Generate Access and Refresh Tokens
          const body = { id: user.id, role: user.isAdmin ? "admin" : "user" };
          const accessToken = jwtGenerator(body);
          const refreshToken = jwtGenerator(body);
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
          });
          return new HttpResponse("Successfully logged in user", true, {
            accessToken,
          }).ok(res);
        });
      } catch (err) {
        return next(err);
      }
    })(req, res, next);
  }

  refreshToken(req, res) {
    const { accessToken, refreshToken } = req.user;
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    new HttpResponse("Successfully reauthenticated user", true, {
      accessToken,
    }).ok(res);
  }
}

module.exports = AuthController;
