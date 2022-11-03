const express = require('express');
const router = express.Router();

const indexRouter = require('./index.js');

router.use('/', indexRouter);

module.exports = router;
