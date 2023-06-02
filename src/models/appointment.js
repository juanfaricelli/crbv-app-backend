const mongoose = require('mongoose');

const COLL_APPOINTMENTS = 'appointments';

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

const appointmentSchema = mongoose.Schema(
  {
    patient: {
      id: {
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
    },
    specialty: idNamePropsSchema,
    doctor: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    date_to_show: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    sobreturno: {
      type: Boolean,
      required: true,
    },
    attendance: {
      type: Boolean,
      required: true,
    },
    confirmed: {
      type: Boolean,
      required: true,
    },
    cancelled: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
const Appointment = mongoose.model(COLL_APPOINTMENTS, appointmentSchema);

module.exports = { Appointment };
