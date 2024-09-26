
const authenticationRequired = async (req, res, next) => {
  if (!req.session || !req.session.authenticated || !req.session.user) {
    const code = 403;
    res.status(code).json({ code, message: 'Authentication required' });
  } else {
    next();
  }
};

module.exports = {
  authenticationRequired,
};