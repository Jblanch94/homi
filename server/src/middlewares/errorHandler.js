const HttpResponse = require('../HttpResponse');

module.exports = function (err, req, res, next) {
  console.error(err.stack);
  new HttpResponse(err, false).serverError(res);
};
