// *******************
// this handles the routing for authentication checking db for
// users that are already registered and having them be able to login
// with their credentials
// *******************
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
// this will add validation middleware to review the data a user enters
const { check, validationResult } = require('express-validator');

// @route GET api/auth
// @desc find a user by their ID in the db
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    // return user object from db w/o the password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/auth
// @desc      Authenticate user & get JWT
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // this will hold the data of the user object and will log in terminal
    console.log(
      `This user was created successfully: ${JSON.stringify(req.body.email)}`
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check to see if user exists
    const { email, password } = req.body;

    try {
      // if user exists then send an error so that way
      // there are not multiple users with the same email
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // need to make sure email and password matches the data in db
      // compare() is a method used to compare a plain text
      // password to an encrypted/hashed password
      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] }); 
      }

      //return the JWT of a particular user's id from the db
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
