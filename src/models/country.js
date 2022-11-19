const mongoose = require('mongoose');

const COLL_COUNTRIES = 'countries';

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Country = mongoose.model(COLL_COUNTRIES, countrySchema);

module.exports = { Country };
