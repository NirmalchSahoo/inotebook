const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Nisghcdeybue@#ghty';

// create user using : POST "/api/auth/" . doesn't required auth // no login required

router.post(
  '/',
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
module.exports = router;