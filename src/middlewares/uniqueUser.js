const UserService = require("../services/UserService");
const HttpResponse = require("../HttpResponse");

module.exports = async function (req, res, next) {
  const userService = new UserService();
  const user = await userService.fetchUserByEmail(req.body.email);
  if (user !== null) {
    console.log(req.body.email);
    console.log("user exists");
    return new HttpResponse("User already exists", false).badRequest(res);
  }

  next();
};
