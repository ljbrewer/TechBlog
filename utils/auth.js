const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  } else {
    next();
  }
};
const withAuthApi = (req, res, next) => {
  if (!req.session.logged_in) {
    res.status(404).json({success: false, error: 'User is not logged in'});
    return;
  } else {
    next();
  }
};

module.exports = {withAuth, withAuthApi};
