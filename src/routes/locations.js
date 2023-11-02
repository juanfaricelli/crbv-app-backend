const express = require('express');
const { Location } = require('../models/location');
const locationsSource = require('../sources/localidades.json');

const router = express.Router();

router.post('/locations/populate', (req, res) => {
  const locations = locationsSource;
  Location.insertMany(locations)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/locations', (req, res) => {
  Location.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/locations/province/:province', (req, res) => {
  const { province } = req.params;
  Location.findOne({ _id: province })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/locations/province/:province/city/:city', (req, res) => {
  const { province, city } = req.params;
  Location.findOne({ _id: province })
    .then((data) =>
      res.json(data.cities.filter((cityObj) => cityObj.id === city))
    )
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
