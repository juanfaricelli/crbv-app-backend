const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const genderSchema = new Schema({
  male: { type: Boolean, required: true },
  female: { type: Boolean, required: true },
  nonbinary: { type: Boolean, required: true },
  transgender: { type: Boolean, required: true },
  other: { type: Boolean, required: true },
});

const maritalStatusSchema = new Schema({
  single: { type: Boolean, required: true },
  married: { type: Boolean, required: true },
  divorced: { type: Boolean, required: true },
  widowed: { type: Boolean, required: true },
  cohabiting: { type: Boolean, required: true },
  civil_union: { type: Boolean, required: true },
});

const userSchema = new Schema({
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
  user_type: {
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
    birthdate: {
      type: Date,
      required: true,
    },
    id_number: {
      type: String,
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
    gender: genderSchema,
    phone: {
      type: String,
      required: true,
    },
    health_insurance: idNamePropsSchema,
    health_insurance_id: {
      type: String,
      required: true,
    },
    marital_status: maritalStatusSchema,
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
    email: {
      type: String,
      required: true,
    },
  },
  active_user: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

// Pre-save middleware to calculate age
userSchema.pre('save', function (next) {
  const user = this;
  if (user.user_data.birthdate) {
    const birthdate = new Date(user.user_data.birthdate);
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    user.user_data.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  next();
});

const User = mongoose.model(COLL_USERS, userSchema);

module.exports = { User };
