const mongoose = require('mongoose');

const COLL_MEDICAL_RECORDS = 'medical_records';

const medicalRecordSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    appointment: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    patientCondition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PatientCondition',
      required: true,
    },
    appointmentManagement: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: true,
    },
    deceasedDate: {
      type: Date,
      required: false,
    },
    voluntaryRetirementDate: {
      type: Date,
      required: false,
    },
    hospitalizedDate: {
      type: Date,
      required: false,
    },
    recoveredDate: {
      type: Date,
      required: false,
    },
    patientId: {
      type: Number,
      required: true,
    },
    doctorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MedicalRecord = mongoose.model(COLL_MEDICAL_RECORDS, medicalRecordSchema);

module.exports = { MedicalRecord };
