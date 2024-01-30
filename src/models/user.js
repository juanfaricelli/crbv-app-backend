const mongoose = require('mongoose');

const COLL_USERS = 'users';

const idNamePropsSchema = {
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
};

const userSchema = mongoose.Schema(
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
      staff: {
        type: Boolean,
        required: true,
      },
      doctor: {
        type: Boolean,
        required: true,
      },
      patient: {
        type: Boolean,
        required: true,
      },
    },
    user_data: {
      id_type: idNamePropsSchema,
      id_number: {
        type: Number,
        required: true,
      },
      born_date: {
        type: Date,
        required: true,
      },
      first_name: {
        type: String,
        required: true,
      },
      last_name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      gender: {
        male: {
          type: Boolean,
          required: true,
        },
        female: {
          type: Boolean,
          required: true,
        },
        nonbinary: {
          type: Boolean,
          required: true,
        },
        transgender: {
          type: Boolean,
          required: true,
        },
        other: {
          type: Boolean,
          required: true,
        },
      },
      phone: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      health_insurance: idNamePropsSchema,
      health_insurance_id: {
        type: Number,
        required: true,
      },
      marital_status: {
        single: {
          type: Boolean,
          required: true,
        },
        married: {
          type: Boolean,
          required: true,
        },
        divorced: {
          type: Boolean,
          required: true,
        },
        widowed: {
          type: Boolean,
          required: true,
        },
        cohabiting: {
          type: Boolean,
          required: true,
        },
        civil_union: {
          type: Boolean,
          required: true,
        },
      },
      nationality: {
        type: String,
        required: true,
      },
      country: idNamePropsSchema,
      province: idNamePropsSchema,
      location: idNamePropsSchema,
      street: {
        type: String,
        required: true,
      },
      street_num: {
        type: String,
        required: true,
      },
      flat: {
        type: String,
        required: true,
      },
      flat_num: {
        type: String,
        required: true,
      },
      blood_type: {
        type: String,
        required: true,
      },
      mp: {
        type: String,
        required: false,
      },
      specialties: {
        type: [idNamePropsSchema],
        required: false,
      },
      working_days: {
        type: [String],
        required: false,
      },
      working_hours: {
        type: [String],
        required: false,
      },
    },
    medical_record: {
      type: String,
      required: false,
    },
    active_user: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const User = mongoose.model(COLL_USERS, userSchema);

module.exports = { User };
