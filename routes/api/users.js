// *******************
// this handles the API routing for creating a user and holding relevant data
// *******************

const express = require('express');
const router = express.Router();
// this will add validation middleware to review the data a user enters
const { check, validationResult } = require('express-validator');

// @route    GET api/user
// @desc     test to confirm api routing is working successfully
// @access   Public (user does not need JWT)
router.get('/', (req, res) => res.send('User route hit successfully'));

// @route     POST api/users
// @desc      to register a user data
// @access    Public (user does not need JWT)
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
  (req, res) => {
    // this will hold the data of the user object and will log in terminal
    // console.log(req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    res.send('User successfully registered');
  }
);

module.exports = router;
