const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.post('/user/create/doctor', (req, res) => {
  if (!req.body.user_data.mp) throw res.json({ message: 'error: missins doctor user data' });
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/user/doctor/all', (req, res) => {
  User.find({ 'role.doctor': true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// TODO: to be tested
router.get('/user/doctor/all/specialty/:specialty', (req, res) => {
  User.find({
    'role.doctor': true,
    'user_data.specialties': req.params.specialty,
  })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/user/doctor/:id_number', (req, res) => {
  const { id_number } = req.params;
  User.findOne({ 'role.doctor': true, 'user_data.id_number': id_number })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/user/doctor/:id', (req, res) => {
  const { id } = req.params;
  User.findOne({ 'role.doctor': true, 'id': id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
