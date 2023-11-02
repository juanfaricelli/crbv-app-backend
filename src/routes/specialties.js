const express = require('express');
const { Specialty } = require('../models/speciality');

const router = express.Router();

router.post('/specialties/populate', (req, res) => {
  const specialties = [
    {
      // _id: 01,
      name: 'Cirugia',
      isActive: false,
    },
    {
      // _id: 02,
      name: 'Traumatologia',
      isActive: false,
    },
    {
      // _id: 03,
      name: 'Ginecologia',
      isActive: false,
    },
    {
      // _id: 04,
      name: 'Pediatria',
      isActive: false,
    },
    {
      // _id: 05,
      name: 'Clinica Medica',
      isActive: false,
    },
    {
      // _id: 06,
      name: 'Cardiologia',
      isActive: false,
    },
  ];
  Specialty.insertMany(specialties)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/specialties', (req, res) => {
  Specialty.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/specialties/:id', (req, res) => {
  Specialty.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.post('/specialties/add', (req, res) => {
  const specialty = new Specialty(req.body);
  specialty
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.put('/specialties/update', (req, res) => {
  const { id, isActive } = req.body;
  Specialty.updateOne(
    { _id: id },
    {
      $set: {
        isActive,
      },
    }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
