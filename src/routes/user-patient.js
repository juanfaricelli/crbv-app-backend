const express = require('express');
const {
  patientNewFormFields,
  patientNewObjectCreator,
  logInRequired,
} = require('../sources/helpers');
const { User } = require('../models/user');
const { MedicalRecord } = require('../models/medical-record');
const { IdType } = require('../models/id-types');
const { HealthInsurance } = require('../models/health-insurance');
const { Country } = require('../models/country');
const { Location } = require('../models/location');

const router = express.Router();

router.get('/user/patient/all', logInRequired, (req, res) => {
  User.find({ 'user_type.patient': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

// this endpoint returns a new patient form
router.get('/user/patient/new', logInRequired, async (req, res) => {
  try {
    const idTypes = await IdType.find({});
    const healthInsurances = await HealthInsurance.find({});
    const countries = await Country.find({});
    const locations = await Location.find({});
    const patientNewForm = patientNewFormFields({
      idTypes,
      healthInsurances,
      countries,
      locations,
    });
    res.json(patientNewForm);
  } catch (error) {
    res.json({ message: `${error}` });
  }
});

router.post('/user/patient/create', logInRequired, async (req, res) => {
  try {
    const idTypes = await IdType.find({});
    const healthInsurances = await HealthInsurance.find({});
    const countries = await Country.find({});
    const locations = await Location.find({});
    const medicalRecord = new MedicalRecord();

    const newPatientPreObj = await patientNewObjectCreator(
      req.body,
      idTypes,
      healthInsurances,
      countries,
      locations
    );

    const ret = await medicalRecord.save();
    const patient = new User(newPatientPreObj);
    patient.medical_record = ret.id;
    patient
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: `${error}` }));
  } catch (error) {
    res.json({ message: `${error}` });
  }
});

router.get('/user/patient/:id_number', logInRequired, (req, res) => {
  const { id_number } = req.params;
  User.find({ 'user_data.id_number': id_number, 'user_type.patient': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.put(
  '/user/patient/:id_number/update',
  logInRequired,
  async (req, res) => {
    const idTypes = await IdType.find({});
    const healthInsurances = await HealthInsurance.find({});
    const countries = await Country.find({});
    const locations = await Location.find({});

    const updatedPatientPreObj = patientNewObjectCreator(
      req.body,
      idTypes,
      healthInsurances,
      countries,
      locations
    );

    const { id_number } = req.params;
    const filter = { 'user_data.id_number': id_number, 'user_type.patient': true };
    const itemsToUpdate = {};
    Object.keys(req.body).forEach((value) => {
      itemsToUpdate[`user_data.${value}`] =
        updatedPatientPreObj.user_data[value];
    });
    const update = { $set: itemsToUpdate };
    User.findOneAndUpdate(filter, update, { new: true })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: `${error}` }));
  }
);

module.exports = router;
