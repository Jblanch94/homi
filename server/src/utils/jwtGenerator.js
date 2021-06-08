const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

module.exports = function (data) {
  const token = jwt.sign({ user: data }, process.env.JWT_SECRET, {
    expiresIn: '20m',
  });
  return token;
};
