// *******************
// this handles the API routing for fetching data about user's profile
// *******************

const express = require('express');
const router = express.Router();

// test route for api/profile
// @desc (for whatever the route does)
// @access Public (user does not need JWT)
router.get('/', (req, res) => res.send('Profile route hit'));

module.exports = router;
