const express = require('express');
const db = require('../config/connection');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('main', { title: '길 잃은 동물들의 이야기' });
});

router.get('/community', async (req, res, next) => {
  try {
    res.render('community');
  } catch (err) {
    next(err);
  }
});

router.get('/missing', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

router.get('/abandoned', async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
