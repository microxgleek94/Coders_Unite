// *******************
// this file handles the API routing for creating a user and holding relevant data
// *******************
const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// this will add validation middleware to review the data a user enters
const { check, validationResult } = require('express-validator');


// ** Routes **
// @route    GET api/user
// @desc     test to confirm api routing is working successfully
router.get('/', (req, res) => res.send('User route hit successfully'));

// @route     POST api/users
// @desc      to register and validate a user's data and save it to db
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    // this will hold the data of the user object and will log in terminal
    // console.log(`This user was created successfully: ${JSON.stringify(req.body.name)}`);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // check to see if user exists
    const { name, email, password } = req.body;

    try {
      // if user exists then send an error so that way
      // there are not multiple users with the same email
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // get user's gravatar and put in options for the recv'd img
      const avatar = gravatar.url(email, {
        // s is default size of img
        s: '200',
        // r makes sure picture is appropriate for site
        r: 'pg',
        // d is for default img if user does not have a gravatar
        d: 'mm',
      });

      // if a user does not exist, create a new instance of a user to save to db
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt the password using bcrypt
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // save user to db
      await user.save();

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
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
