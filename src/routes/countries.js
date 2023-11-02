const express = require('express');
const { Country } = require('../models/country');
const countriesSource = require('../sources/paises.json');

const router = express.Router();

router.post('/countries/populate', (req, res) => {
  const countries = countriesSource;
  Country.insertMany(countries)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/countries', (req, res) => {
  Country.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/countries/:id', (req, res) => {
  const { id } = req.params;
  Country.findOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
