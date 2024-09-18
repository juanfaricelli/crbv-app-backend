const express = require('express');
const { User } = require('../models/user');
const { decrypt } = require('../sources/encoderHelper');

const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/auth/login', async (req, res) => {
  try {
    const { body } = req.body;
    const loginInformation = decrypt(body);
    const { username, password } = JSON.parse(loginInformation);
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
            const userType = Object.keys(user.user_type).find(
              (user_type) => user.user_type[user_type]
            );
            req.session.user = { username, user_type: userType };
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
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong' });
      }
      res.status(200).json({ message: 'Successfully logged out' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
