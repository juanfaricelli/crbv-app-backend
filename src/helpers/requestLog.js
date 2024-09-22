const { RequestLog } = require('../models/request-log');
const requestLog = async (req, res, next) => {
  const log = new RequestLog({
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });

  try {
    await log.save();
    next();
  } catch (error) {
    console.error('Error logging request:', error);
    next();
  }
};

module.exports = {
  requestLog,
};