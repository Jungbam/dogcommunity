const express = require('express');

const router = express.Router();

const pageRouter = require('./pages');
const api = require('./v1');

// 각 라우터별 요청 처리 js로 연결해줌.
router.use('/', pageRouter);
router.use('/v1', api);

module.exports = router;
