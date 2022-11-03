const express = require('express');

const router = express.Router();

router.get('/abandoned', function (req, res, next) {
  res.render('abandoned', { title: '길 잃은 동물들의 이야기' });
});

module.exports = router;
