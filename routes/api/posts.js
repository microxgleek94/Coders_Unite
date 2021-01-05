// *******************
// this handles the API routing for post/forum data, i.e liking or making a post
// *******************

const express = require('express');
const router = express.Router();

// test route for api/post
// @desc (for whatever the route does)
// @access Public (user does not need JWT)
router.get("/", (req, res) => res.send('Posts route hit'));


module.exports = router;