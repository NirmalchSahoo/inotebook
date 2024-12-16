const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { route } = require('./auth');
const fetchUser = require('../middleware/fetchUsers');

const JWT_SECRET = 'Nisghcdeybue@#ghty';

// ROUTE 1
// create user using : POST "/api/auth/" . doesn't required auth // no login required

router.post(
  '/createuser',
  [
    // name must be at least 5 chars long
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // username must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    // if there are errors returb bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check weather this user with same email already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          error: `Sorry a user with this email :  ${req.body.email} already exists`,
        });
      }

      // hashing password using bcryptjs hash
      const salt = await bcrypt.genSalt(10);

      const SecucePassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecucePassword,
      });

      // resposne send
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      //   console.log('hwtDAta', authToken);

      //   res.json(user);
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Some error occured');
    }
  }
);

// ROUTE 2
// authenticate a  user using : POST "/api/auth/login" . doesn't required auth // no login required

router.post(
  '/login',
  [
    // username must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password can not be blank').exists(),
  ],
  async (req, res) => {
    // if there are errors returb bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    console.log(email, password);

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Please try to login with correct credentials' });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      console.log('passwordcompare ==>', passwordCompare);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: 'Please try to login with correct credentials' });
      }

      // resposne send
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal server error');
    }
  }
);

// ROUTE 3
// get logged in user details : POST "/api/auth/getuser" . doesn't required auth // login required

router.get('/getuser', fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
