const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

// // dummy database

// var users = {
//   tj: { name: 'tj' }
// };

// // when you create a user, generate a salt
// // and hash the password ('foobar' is the pass here)

// hash({ password: 'foobar' }, function (err, pass, salt, hash) {
//   if (err) throw err;
//   // store the salt & hash in the "db"
//   users.tj.salt = salt;
//   users.tj.hash = hash;
// });

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  // let foundUser = {}
  // User.findOne({ username })
  //   .then((data) => { foundUser = data })
  //   .catch((error) => res.json({ message: `${error}` }));
  console.log('username, password', username, password);
  if (username && password) {
    if (req.session && req.session.authenticated) {
      res.json(req.session);
    } else {
      // User.findOne({ username })
      //   .then((data) => {
      //     foundUser = data;
      //   })
      //   .catch((error) => res.json({ message: `${error}` }));

      if (password === '123') {
        req.session.authenticated = true;
        req.session.user = { username };
        res.json(req.session);
      } else {
        res.status(403).json({ msg: 'Bad Credentials 2' });
      }
    }
  } else {
    res.status(403).json({ msg: 'Bad Credentials 1' });
  }
});

module.exports = router;