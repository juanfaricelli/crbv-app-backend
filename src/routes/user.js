const express = require('express');
const { UserAdmin } = require('../models/user');

const router = express.Router();

router.post('/user/create/admin', (req, res) => {
  const userAdmin = new UserAdmin(req.body);
  userAdmin
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.post('/user/login', (req, res) => {
  const { username } = req.body;
  UserAdmin.findOne({ username })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
