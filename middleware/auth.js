// *******************
// this middleware will send the user's JWT back to the client side
// so that way the user can access protected routes
// *******************
const jwt = require('jsonwebtoken');
const config = require('config');


// middleware functions always have the params of req, res, and next
// next is a callback to move to the next step of code/middleware
module.exports = function (req, res, next) {

  // Get token from header
  const token = req.header('x-auth-token');

  // Check if there isn' a token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // If there is a token, verify it
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }

};
