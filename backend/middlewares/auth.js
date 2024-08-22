const express = require('express');
const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');
require('dotenv').config();

const app = express();

// Session middleware to handle cookie-based sessions
app.use(
  cookieSession({
    name: 'candidly-session',
    keys: [process.env.JWT_SECRET], // Use JWT secret as the cookie session key
    httpOnly: true, // Ensure cookies are accessible only by the web server
  }),
);

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1] || req.session.token;

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};
