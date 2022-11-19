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

module.exports = router;
