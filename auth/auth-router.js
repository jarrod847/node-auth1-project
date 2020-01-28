const router = require('express').Router();
const bc = require("bcryptjs")
const Users = require('../users/users-model.js');
const Restricted = require('../api/restricted-middleware')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(req.body.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      req.session.username = saved.username;
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        req.session.loggedIn = true
        req.session.userId = user.id
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', Restricted, (req, res) => {
  Users.find()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "failed to get users"})
})
})

module.exports = router;