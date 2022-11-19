const mongoose = require('mongoose');

const COLL_DIAGNOSTICS = 'diagnostics';

const diagnosisSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Diagnosis = mongoose.model(COLL_DIAGNOSTICS, diagnosisSchema);

module.exports = { Diagnosis };
