const mongoose = require('mongoose');

const COLL_SPECIALTIES = 'specialties';

const specialtySchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const Specialty = mongoose.model(COLL_SPECIALTIES, specialtySchema);

module.exports = { Specialty };
