const mongoose = require('mongoose');

const COLL_USERS = 'users';

const userAdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      value: {
        type: String,
        required: true,
      },
      default: {
        type: Boolean,
        required: true,
      },
    },
    role: {
      admin: {
        type: Boolean,
        required: true,
      },
    },
    user_data: {
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);
const UserAdmin = mongoose.model(COLL_USERS, userAdminSchema);

module.exports = { UserAdmin };
