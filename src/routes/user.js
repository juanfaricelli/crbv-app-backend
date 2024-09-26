const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

router.post('/user/create/admin', (req, res) => {
  const user = new User(req.body);
  // TODO: add user_type validation
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.post('/user/login', (req, res) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/user/all', (req, res) => {
  User.find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.get('/user/:id_number', (req, res) => {
  const { id_number } = req.params;
  User.find({ _id: id_number })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

router.put('/user/:id_number/set-active', async (req, res) => {
  try {
    const { id_number } = req.params;
    const filter = { _id: id_number };
    const currentValue = await User.findOne({ _id: id_number });
    const update = { $set: { active_user: !currentValue.active_user } };
    User.findOneAndUpdate(filter, update, { new: true })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: `${error}` }));
  } catch (error) {
    res.json({ message: `${error}` });
  }
});

router.put('/user/:id_number/update', (req, res) => {
  const { id_number } = req.params;
  const filter = { _id: id_number };
  const update = { $set: req.body };
  User.findOneAndUpdate(filter, update, { new: true })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: `${error}` }));
});

module.exports = router;
