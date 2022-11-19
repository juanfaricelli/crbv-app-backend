const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.post('/user/create/admin', (req, res) => {
  const user = new User(req.body);
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

module.exports = router;
