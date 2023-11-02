const express = require('express');
const { PatientCondition } = require('../models/patient-condition');

const router = express.Router();

router.post('/patient-conditions/populate', (req, res) => {
  const patientConditions = [
    { name: 'Consulta Medica' },
    { name: 'Internacion' },
    { name: 'Observación' },
    { name: 'Recuperado' },
    { name: 'Cronico' },
    { name: 'Iguales condiciones' },
    { name: 'Retiro Voluntario' },
    { name: 'Fallecido' },
  ];
  PatientCondition.insertMany(patientConditions)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/patient-conditions', (req, res) => {
  PatientCondition.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/patient-conditions/:id', (req, res) => {
  PatientCondition.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
