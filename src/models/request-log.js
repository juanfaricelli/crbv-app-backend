const mongoose = require('mongoose');

const COLL_REQUEST_LOGS = 'request_logs';

const requestLogSchema = mongoose.Schema({
  method: String,
  url: String,
  headers: Object,
  body: Object,
  timestamp: { type: Date, default: Date.now },
  session: Object,
});
const RequestLog = mongoose.model(COLL_REQUEST_LOGS, requestLogSchema);

module.exports = { RequestLog };
