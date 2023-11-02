const mongoose = require('mongoose');
const { newMedicalRecordForm } = require('../sources/helpers');

const COLL_MEDICAL_RECORDS = 'medical_records';

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

const entrySchema = mongoose.Schema(
  {
    date: {
      type: Date,
      require: true,
    },
    speciality: idNamePropsSchema,
    doctor: idNamePropsSchema,
    appointment: {
      type: String,
      required: false,
    },
    entry_reason: idNamePropsSchema,
    description: {
      type: String,
      required: true,
    },
    patient_status: idNamePropsSchema,
    exit_date: {
      type: Date,
      required: true,
    },
    hospitalized_days: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

console.log('newMedicalRecordForm', newMedicalRecordForm);
const medicalRecordSchema = mongoose.Schema(
  {
    questionary: {
      type: Object,
      required: false,
      default: { ...newMedicalRecordForm },
    },
    entries: {
      type: [entrySchema],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
);
const MedicalRecord = mongoose.model(COLL_MEDICAL_RECORDS, medicalRecordSchema);

module.exports = { MedicalRecord };
