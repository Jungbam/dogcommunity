const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('abandoned', { title: '길 잃은 동물들의 이야기' });
});

module.exports = router;
