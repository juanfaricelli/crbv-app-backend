const express = require('express');
const { Appointment } = require('../models/appointment');

const router = express.Router();

router.post('/appointments/create', (req, res) => {
  const appointment = new Appointment(req.body);
  appointment
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// GET /appointments/new
// PUT /appointments/update
// PUT /appointments/confirm
// PUT /appointments/close
// PUT /appointments/cancelled
// GET /appointments
// GET /appointments/doctor/:id
// GET /appointments/patient/:id
// GET /appointments/specialty/:id

module.exports = router;
