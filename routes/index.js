const express = require('express');

const router = express.Router();

const mainRouter = require('./main');
const boardRouter = require('./board');
const articlesRouter = require('./articles');

// 각 라우터별 요청 처리 js로 연결해줌.
router.use('/', mainRouter);
router.use('/board', boardRouter);
router.use('/articles', articlesRouter);

module.exports = router;
