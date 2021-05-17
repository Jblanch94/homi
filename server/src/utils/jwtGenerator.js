const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (data) {
  const token = jwt.sign({ user: data }, process.env.JWT_SECRET, {
    expiresIn: '20m',
  });
  return token;
};
