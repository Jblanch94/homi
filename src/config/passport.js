const passport = require("passport");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const Family = require("../models/Family");
const { ExtractJwt } = require("passport-jwt");
const jwtGenerator = require("../utils/jwtGenerator");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Middleware for registering a user as a member of the family
//TODO: SET UP CLOUDINARY SO USER CAN UPLOAD PROFILE PICTURE
passport.use(
  "register-user",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "email",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // create user with the provided parameters
        const userData = {
          ...req.body,
          FamilyId: parseInt(req.params.familyId),
        };
        const newUser = await User.create(userData);
        console.log(newUser);
        return done(null, newUser);
      } catch (err) {
        console.error(err);
        done(err);
      }
    }
  )
);

// Middleware for logging in a user
passport.use(
  "login-user",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        // find user by the email
        const user = await User.findOne({ where: { email } });
        if (user == null) {
          return done(null, false, { message: "Invalid credentials" });
        }

        // find the associated family
        const family = await Family.findByPk(user.FamilyId);
        if (family == null) {
          return done(null, false, { message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, family.password);
        if (!validPassword) {
          return done(null, false, { message: "Invalid credentials" });
        }
        done(null, user);
      } catch (err) {
        console.error(err.message);
        done(err);
      }
    }
  )
);

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.refreshToken;
  }

  return token;
};

// Middleware for refreshing a token
(() => {
  const options = {};
  options.jwtFromRequest = cookieExtractor;
  options.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    "refreshToken",
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.user.id);

        if (user == null) {
          return done, false, { message: "Could not verify user" };
        }

        // generate new tokens and return both tokens
        const accessToken = jwtGenerator(jwt_payload.user);
        const refreshToken = jwtGenerator(jwt_payload.user);

        return done(null, { accessToken, refreshToken });
      } catch (err) {
        console.error(err);
        done(err, false);
      }
    })
  );
})();

// Middleware for verifying user is authenticated
(() => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_SECRET;

  passport.use(
    "authenticate",
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findByPk(jwt_payload.user.id);

        if (user == null) {
          return done(null, false, { message: "Could not verify user" });
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    })
  );
})();
