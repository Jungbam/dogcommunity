const express = require('express');
const db = require('../config/connection');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('community');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
