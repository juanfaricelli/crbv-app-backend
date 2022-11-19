const mongoose = require('mongoose');

const COLL_HEALTH_INSURANCES = 'health_insurances';

const healthInsuranceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const HealthInsurance = mongoose.model(
  COLL_HEALTH_INSURANCES,
  healthInsuranceSchema
);

module.exports = { HealthInsurance };
