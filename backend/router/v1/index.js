const express = require('express');
const authRoutes = require('./auth');
const userRoutes = require('./users');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;