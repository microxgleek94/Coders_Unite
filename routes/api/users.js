// *******************
// this handles the API routing for creating a user and holding relevant data
// *******************

const express = require('express');
const router = express.Router();

// test route for api/user
// @desc (for whatever the route does)
// @access Public (user does not need JWT)
router.get("/", (req, res) => res.send('User route hit'));


module.exports = router;
