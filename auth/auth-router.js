const router = require('express').Router();
const bc = require("bcryptjs")
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bc.hashSync(req.body.password, 8);
  user.password = hash;

  Users.add(user)
    .then(saved => {
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
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/users', (req, res) => {
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