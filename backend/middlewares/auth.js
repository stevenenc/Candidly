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
