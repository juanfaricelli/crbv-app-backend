const express = require('express');
const {
  medicalRecordNewEntryFields,
  newMedicalRecordForm,
} = require('../helpers/formFields');
const { MedicalRecord } = require('../models/medical-record');
const { User } = require('../models/user');
const { Specialty } = require('../models/speciality');
const { PatientCondition } = require('../models/patient-condition');

const router = express.Router();

router.post('/medical-record/create', (req, res) => {
  const medicalRecord = new MedicalRecord();
  medicalRecord
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/medical-record/:id', (req, res) => {
  const { id } = req.params;
  MedicalRecord.find({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

// populate new medical-record form
router.get('/medical-record/new-form/populate', (req, res) => {
  const { id } = req.params;
  MedicalRecord.find({ _id: id })
    .then((data) => res.json(newMedicalRecordForm))
    .catch((error) => res.json({ message: `${error}` }));
});

// new medical-record form
router.get('/medical-record/new-form', (req, res) => {
  const { id } = req.params;
  MedicalRecord.find({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

// medical-record new-entry form
router.get('/medical-record/:id_mr/new-entry', async (req, res) => {
  try {
    const { id_mr } = req.params;
    const { appointment } = req.query;
    const patient = await User.findOne({ medical_record: id_mr });
    const specialities = await Specialty.find({});
    const patientConditions = await PatientCondition.find({});
    const medicalRecordNewEntry = medicalRecordNewEntryFields({
      patient_name: `${patient.user_data.first_name} ${patient.user_data.last_name}`,
      appointment,
      specialities,
      patientConditions,
    });

    res.json(medicalRecordNewEntry);
  } catch (error) {
    console.log('error', error);
    res.json({ message: `${error}` });
  }
});
// PUT /medical-record/:id/new

// GET /medical-record/:id/new/form // new medical-record entry
// PUT /medical-record/:id/new/form-entry

module.exports = router;
