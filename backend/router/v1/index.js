const express = require('express');
const userRoutes = require('./users');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/users', userRoutes);

module.exports = router;