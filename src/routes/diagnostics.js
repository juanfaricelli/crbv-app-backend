const express = require('express');
const { Diagnosis } = require('../models/diagnosis');

const router = express.Router();

router.post('/diagnostics/populate', (req, res) => {
  const diagnostics = [
    { name: 'Cardiovasculares' },
    { name: 'Infeccioso' },
    { name: 'Digestivo' },
    { name: 'Musculoesqueleticos' },
    { name: 'Neurologico' },
    { name: 'Urologico' },
    { name: 'Nefrologico' },
    { name: 'Hematologico' },
    { name: 'Respiratorio' },
    { name: 'Otros' },
  ];
  Diagnosis.insertMany(diagnostics)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/diagnostics', (req, res) => {
  Diagnosis.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/diagnostics/:id', (req, res) => {
  Diagnosis.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
