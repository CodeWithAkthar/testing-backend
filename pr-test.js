// auth/login.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // BUG 1: SQL injection (even though this is Mongo, shows AI catches the pattern)
  // BUG 2: No input validation whatsoever
  const user = await db.collection('users').findOne({ 
    email: email,
    password: password  // BUG 3: Plaintext password comparison — never hash
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // BUG 4: Secret hardcoded directly in source code
  const token = jwt.sign({ userId: user._id }, 'mysecretkey123', {
    // BUG 5: Token never expires — lives forever
  });

  // BUG 6: Sending the entire user object including password hash back to client
  res.json({ token, user });
});

module.exports = router;
