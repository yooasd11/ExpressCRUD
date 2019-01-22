const express = require('express');
const loginRoutes = require('./login');
const userRoutes = require('./users');

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/login', loginRoutes);
router.use('/users', userRoutes);

module.exports = router;