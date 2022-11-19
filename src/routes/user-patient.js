const express = require('express');
const { User } = require('../models/user');
const { MedicalRecord } = require('../models/medical-record');

const router = express.Router();

router.get('/user/patients', (req, res) => {
  User.find({ 'role.patient': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post('/user/create/patient', async (req, res) => {
  try {
    const medicalRecord = new MedicalRecord();
    const ret = await medicalRecord.save();
    const patient = new User(req.body);
    patient.medical_record = ret.id;
    patient
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (error) {
    res.json({ message: error });
  }
});

router.get('/user/patient/:id_number', (req, res) => {
  const { id_number } = req.params;
  User.find({ 'user_data.id_number': id_number, 'role.patient': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
