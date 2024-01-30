const express = require('express');
const { User } = require('../models/user');

const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!(username && password)) throw 'Incorrect user or password';
    User.findOne({ username })
      .then(async (data) => {
        const user = data;
        const authenticated = await bcrypt.compare(
          password,
          user.password.value
        );

        if (req.session && req.session.authenticated) {
          res.json(req.session);
        } else {
          if (authenticated) {
            req.session.authenticated = authenticated;
            req.session.user = { username };
            res.json(req.session);
          } else {
            res.status(403).json({ message: 'Bad Credentials 2' });
          }
        }
      })
      .catch((error) => res.json({ message: `${error}` }));
  } catch (error) {
    res.status(403).json({ message: `Bad Credentials 1. ERROR: ${error}` });
  }
});

router.post('/auth/logout', async (req, res) => {
  try {
    delete req.session.user;
    res.status(200).json({ message: 'Successfylly logged out' });
  } catch (error) {
    res.status(500).json({ message: 'Something went bad' });
  }
});

module.exports = router;
