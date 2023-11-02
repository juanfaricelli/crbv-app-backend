const express = require('express');
const { HealthInsurance } = require('../models/health-insurance');

const router = express.Router();

router.post('/health-insurances/populate', (req, res) => {
  const insurances = [
    {
      name: 'OSDE',
    },
    {
      name: 'OMINT',
    },
    {
      name: 'PREVENCION SALUD',
    },
    {
      name: 'PREMEDIC',
    },
    {
      name: 'SANCOR SALUD',
    },
    {
      name: 'GALENO',
    },
    {
      name: 'SWISS MEDICAL',
    },
  ];
  HealthInsurance.insertMany(insurances)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/health-insurances', (req, res) => {
  HealthInsurance.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/health-insurances/:id', (req, res) => {
  const { id } = req.params;
  HealthInsurance.find({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
