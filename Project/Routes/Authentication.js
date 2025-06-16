const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const keys = require('../config/keys');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hash });
  res.json({ message: 'User registered', user });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, keys.jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

// Protected
router.get('/protected', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, keys.jwtSecret);
    const user = await User.findById(decoded.id);
    res.json({ message: 'Protected data', user });
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
