const express = require('express');
const { User } = require('../models/user');
const { Session } = require('../models/session');
const { decrypt } = require('../helpers/encoderHelper');
const crypto = require('crypto');

const bcrypt = require('bcrypt');

const router = express.Router();
const code403 = 403;
const code404 = 404;

router.post('/auth/login', async (req, res) => {
  try {
    const { body } = req.body;
    const loginInformation = decrypt(body);
    const { username, password } = JSON.parse(loginInformation);
    if (!(username && password)) throw 'Incorrect user or password';
    User.findOne({ username })
      .then(async (data) => {
        if (!data) {
          res
            .status(code404)
            .json({ code: code404, message: 'User not found' });
          return;
        }
        const user = data;
        const authenticated = await bcrypt.compare(
          password,
          user.password.value
        );

        if (req.session) {
          if (authenticated) {
            req.session.authenticated = authenticated;
            const userType = Object.keys(user.user_type).find(
              (user_type) => user.user_type[user_type]
            );
            req.session.user = { username, user_type: userType };
            const token = crypto.randomBytes(16).toString('hex');
            req.session.token = token;
            req.session.session_id = req.sessionID;
            req.session.session_id = req.sessionID;
            req.session.created_at = new Date().toISOString();
            res.json(req.session);
          } else {
            res.status(code403).json({
              code: code403,
              message: 'username or password is incorrect',
            });
          }
        }
      })
      .catch((error) => res.json({ message: `${error}` }));
  } catch (error) {
    res.status(code403).json({
      code: code403,
      message: `Session went wrong, please try again later. ERROR: ${error}`,
    });
  }
});

router.post('/auth/logout', async (req, res) => {
  try {
    await Session.deleteOne({ session_id: req.sessionID });
    req.session.destroy(async (err) => {
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
