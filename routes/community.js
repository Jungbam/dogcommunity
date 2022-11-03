const express = require('express');
const db = require('../db/connection');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('community', { title: '길 잃은 동물들의 이야기' });
});

router.post('/', async (req, res, next) => {});

module.exports = router;
