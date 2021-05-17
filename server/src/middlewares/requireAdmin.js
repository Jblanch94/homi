module.exports = function (req, res, next) {
  console.log('user admin status: ', req.user.isAdmin);
  if (!req.user.isAdmin) {
    const error = new Error('Not authorized');
    next(error);
  }
  next();
};
