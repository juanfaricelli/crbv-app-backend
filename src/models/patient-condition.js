const mongoose = require('mongoose');

const COLL_PATIENT_CONDITIONS = 'patient_conditions';

const patientConditionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const PatientCondition = mongoose.model(COLL_PATIENT_CONDITIONS, patientConditionSchema);

module.exports = { PatientCondition };
