const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const Family = require('../models/Family');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id, (err, user) => {
    done(err, user);
  });
});

// Authentication strategy for registering a user as a member of the family
passport.use(
  'local-register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
          return done(null, false);
        } else {
          const userData = {
            ...req.body,
            FamilyId: parseInt(req.params.familyId),
          };
          const newUser = await User.create(userData);
          console.log(newUser);

          return done(null, newUser);
        }
      } catch (err) {
        console.log(err.message);
        done(err);
      }
    }
  )
);

// Authentication Strategy for authenticating a user upon logging in successfully
passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // find the user with the specified email
        const user = await User.findOne({ where: { email: email } });
        if (user == null) {
          return done(null, false, { message: 'Could not verify credentials' });
        }

        // use the provided Family Id to get the password
        const family = await Family.findByPk(user.FamilyId);
        if (family == null) {
          return done(null, false, { message: 'Could not verify credentials' });
        }

        // compare the password provided with the stored family password
        const validPassword = await bcrypt.compare(password, family.password);

        // if successful return the authenticated user
        if (validPassword) {
          return done(null, user);
        }
        return done(null, false, { message: 'Could not verify credentials' });
      } catch (err) {
        done(err);
      }
    }
  )
);
