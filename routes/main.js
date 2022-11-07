const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.render('main');
});

module.exports = router;
