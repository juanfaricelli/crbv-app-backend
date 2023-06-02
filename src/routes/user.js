const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.post('/user/create/admin', (req, res) => {
  const user = new User(req.body);
  // TODO: add role validation
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post('/user/login', (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/user/all', (req, res) => {
  User.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get('/user/:id_number', (req, res) => {
  const { id_number } = req.params;
  User.find({ _id: id_number })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// GET /user/:id
// PUT /user/:id/set-active
// PUT /user/:id/update

module.exports = router;
