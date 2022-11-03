const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('missing', { title: '길 잃은 동물들의 이야기' });
});

router.post('/', (req, res, next) => {});

router.get('/:id', (req, res, next) => {});

module.exports = router;
