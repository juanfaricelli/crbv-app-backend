const { RequestLog } = require('../models/request-log');
const requestLog = async (req, res, next) => {
  const log = new RequestLog({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
    session: req.session,
  });

  const isExcluded = ['/ping'].includes(req.url);

  try {
    if (!isExcluded) {
      await log.save();
    }
    next();
  } catch (error) {
    console.error('Error logging request:', error);
    next();
  }
};

module.exports = {
  requestLog,
};