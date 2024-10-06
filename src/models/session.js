const mongoose = require('mongoose');

const COLL_SESSIONS = 'sessions';
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  session: {
    cookie: {
      originalMaxAge: {
        type: Number,
        required: true,
      },
      partitioned: {
        type: Schema.Types.Mixed,
        default: null,
      },
      priority: {
        type: Schema.Types.Mixed,
        default: null,
      },
      expires: {
        type: Date,
        required: true,
      },
      secure: {
        type: Boolean,
        required: true,
      },
      httpOnly: {
        type: Boolean,
        required: true,
      },
      domain: {
        type: String,
        default: null,
      },
      path: {
        type: String,
        required: true,
      },
      sameSite: {
        type: Schema.Types.Mixed,
        default: null,
      },
    },
    authenticated: {
      type: Boolean,
      required: true,
    },
    user: {
      username: {
        type: String,
        required: true,
      },
      user_type: {
        type: String,
        required: true,
      },
    },
    token: {
      type: String,
      required: true,
    },
    session_id: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const Session = mongoose.model(COLL_SESSIONS, sessionSchema);

module.exports = { Session };
