// *******************
// this handles the API routing for handle getting a JWT for authentication
// *******************

const express = require('express');
const router = express.Router();

// test route for api/auth
// @desc (for whatever the route does)
// @access Public (user does not need JWT)
router.get("/", (req, res) => res.send('Auth route hit'));


module.exports = router;