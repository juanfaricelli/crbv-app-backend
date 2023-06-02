const express = require('express');
const { MedicalRecord } = require('../models/medical-record');

const router = express.Router();

router.post('/medical-record/create', (req, res) => {
  const medicalRecord = new MedicalRecord();
  medicalRecord
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// GET /medical-record/new
// GET /medical-record/:id
// PUT /medical-record/:id/new
// GET /medical-record/:id/new/form
// PUT /medical-record/:id/new/form-entry

module.exports = router;
