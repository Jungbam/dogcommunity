const express = require('express');

const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('main', { title: '길 잃은 동물들의 이야기' });
});

module.exports = router;
