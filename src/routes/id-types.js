const express = require('express');
const { IdType } = require('../models/id-types');

const router = express.Router();

router.post('/id-types/populate', (req, res) => {
  const idTypes = [
    { name: 'DNI' },
    { name: 'LE' },
    { name: 'LC' },
    { name: 'CI' },
    { name: 'PASAPORTE' },
  ];
  IdType.insertMany(idTypes)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/id-types', (req, res) => {
  IdType.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/id-types/:id', (req, res) => {
  IdType.findOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
