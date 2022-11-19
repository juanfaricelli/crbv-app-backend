const mongoose = require('mongoose');

const COLL_LOCATIONS = 'locations';

const citySchema = mongoose.Schema({
  name: {
      type: String,
      required: true,
    }
});

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cities: [citySchema],
  },
  { timestamps: true }
);
const Location = mongoose.model(COLL_LOCATIONS, locationSchema);

module.exports = { Location };
