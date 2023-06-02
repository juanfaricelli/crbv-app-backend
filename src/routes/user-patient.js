const express = require('express');
const { User } = require('../models/user');
const { MedicalRecord } = require('../models/medical-record');
const { IdType } = require('../models/id-types');
const { HealthInsurance } = require('../models/health-insurance');
const { Country } = require('../models/country');
const { Location } = require('../models/location');

const router = express.Router();

const genderOptions = [
  { name: 'male' },
  { name: 'female' },
  { name: 'nonbinary' },
  { name: 'transgender' },
  { name: 'other' },
];
const bloodTypeOptions = [
  { name: 'A+' },
  { name: 'A-' },
  { name: 'B+' },
  { name: 'B-' },
  { name: 'AB+' },
  { name: 'AB-' },
  { name: 'O+' },
  { name: 'O-' },
];
const maritalStatusOptions = [
  {
    type: 'single',
    name: 'Soltero/a',
  },
  {
    type: 'married',
    name: 'Casado/a',
  },
  {
    type: 'divorced',
    name: 'Divorciado/a',
  },
  {
    type: 'widowed',
    name: 'Viuudo/a',
  },
  {
    type: 'cohabiting',
    name: 'Concubinato',
  },
  {
    type: 'civil_union',
    name: 'Union Civil',
  },
]
const formField = {
  dropdown: ({
    label = 'dropdownLabel',
    placeholder = 'placeholder',
    name = 'dropdownName',
    options = [{}],
    defaulOptionIndex = 0,
    valueKey = 'valueKey',
    valueLabel = 'valueLabel',
  }) => ({
    inputType: 'dropdown',
    label,
    placeholder,
    name,
    options,
    defaulOptionIndex,
    valueKey,
    valueLabel,
  }),
  inputText: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
  }) => ({
    inputType: 'text',
    label,
    placeholder,
    name,
  }),
  inputNumber: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
  }) => ({
    inputType: 'number',
    label,
    placeholder,
    name,
  }),
  datepicker: ({
    label = 'inputlabel',
    placeholder = 'placeholder',
    name = 'inputname',
  }) => ({
    inputType: 'number',
    label,
    placeholder,
    name,
  }),
};

router.get('/user/patient/all', (req, res) => {
  User.find({ 'role.patient': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/user/patient/new', async (req, res) => {
  try {
    const idTypes = await IdType.find({});
    const healthInsurances = await HealthInsurance.find({});
    const countries = await Country.find({});
    const locations = await Location.find({});

    const patientNewFormFields = {
      idTypes: formField.dropdown({
        label: 'Tipo de Documento',
        options: idTypes,
        name: 'id_types',
        defaulOptionIndex: 2,
        placeholder: '',
        valueKey: 'id',
        valueLabel: 'name',
      }),
      id_number: formField.inputNumber({
        label: 'Nº de Documento',
        placeholder: 'Nº de Documento(solo números)',
        name: 'id_number',
      }),
      first_name: formField.inputText({
        label: 'Nombre',
        placeholder: 'Nombre',
        name: 'first_name',
      }),
      last_name: formField.inputText({
        label: 'Apellido',
        placeholder: 'Apellido',
        name: 'last_name',
      }),
      age: formField.inputNumber({
        label: 'Edad',
        placeholder: 'Edad',
        name: 'age',
      }),
      gender: formField.dropdown({
        label: 'Orientacion Sexual',
        options: genderOptions,
        name: 'gender',
        defaulOptionIndex: 4,
        placeholder: 'Orientacion Sexual',
        valueKey: 'name',
        valueLabel: 'name',
      }),
      blood_type: formField.dropdown({
        label: 'Grupo Sanguíneo',
        options: bloodTypeOptions,
        name: 'blood_type',
        defaulOptionIndex: 0,
        placeholder: 'Grupo Sanguíneo',
        valueKey: 'name',
        valueLabel: 'name',
      }),
      health_insurance: formField.dropdown({
        label: 'Obra Social',
        options: healthInsurances,
        name: 'health_insurance',
        defaulOptionIndex: 0,
        placeholder: 'Seleccione Obra Social',
        valueKey: 'id',
        valueLabel: 'name',
      }),
      health_insurance_id: formField.inputNumber({
        label: 'Nº de Socio',
        placeholder: 'Nº de Socio',
        name: 'health_insurance_id',
      }),
      marital_status: formField.dropdown({
        label: 'Estado Civil',
        options: maritalStatusOptions,
        name: 'marital_status',
        defaulOptionIndex: 0,
        placeholder: 'Seleccione Estado Civil',
        valueKey: 'type',
        valueLabel: 'name',
      }),
      nationality: formField.inputText({
        label: 'Nacionalidad',
        placeholder: 'Nacionalidad',
        name: 'nationality',
      }),
      country: formField.dropdown({
        label: 'País',
        options: countries,
        name: 'country',
        placeholder: 'Seleccione País',
        valueKey: 'id',
        valueLabel: 'name',
      }),
      province: formField.dropdown({
        label: 'Provicia',
        options: locations,
        name: 'province',
        placeholder: 'Seleccione Provicia (Solo Argentina)',
        valueKey: 'id',
        valueLabel: 'name',
      }),
      location: formField.dropdown({
        label: 'Localidad',
        options: locations,
        name: 'location',
        placeholder: 'Seleccione Localidad (Solo Argentina)',
        valueKey: 'id',
        valueLabel: 'name',
      }),
      street: formField.inputText({
        label: 'Calle',
        placeholder: 'Calle',
        name: 'street',
      }),
      street_num: formField.inputText({
        label: 'Numero',
        placeholder: 'Numero',
        name: 'street_num',
      }),
      flat: formField.inputText({
        label: 'Piso',
        placeholder: 'Piso',
        name: 'flat',
      }),
      Email: formField.inputText({
        label: 'Depto',
        placeholder: 'Depto',
        name: 'flat_num',
      }),
      phone: formField.inputNumber({
        label: 'Telefono',
        placeholder: 'Telefono(solo números)',
        name: 'phone',
      }),
      email: formField.inputText({
        label: 'Email',
        placeholder: 'Email',
        name: 'email',
      }),
    };
    res.json(patientNewFormFields);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post('/user/patient/create', async (req, res) => {
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

router.get('/user/patient/:id_number', (req, res) => {
  const { id_number } = req.params;
  User.find({ 'user_data.id_number': id_number, 'role.patient': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put('/user/patient/:id_number/update', (req, res) => {
  const { id_number } = req.params;
  const filter = { 'user_data.id_number': id_number, 'role.patient': true };
  const itemsToUpdate = {};
  Object.keys(req.body).forEach(value => {
    itemsToUpdate[`user_data.${value}`] = req.body[value];
  });
  const update = { $set: itemsToUpdate };
  User.findOneAndUpdate(filter, update, { new: true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
