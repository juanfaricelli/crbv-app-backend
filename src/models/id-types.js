const mongoose = require('mongoose');

const COLL_ID_TYPES = 'id_types';

const idTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const IdType = mongoose.model(COLL_ID_TYPES, idTypeSchema);

module.exports = { IdType };
