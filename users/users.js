const router = require('express').Router();
const Restricted = require('../api/restricted-middleware')
const Users = require('./users-model.js');

router.get('/', Restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;