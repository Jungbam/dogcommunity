const { Router } = require('express');

const router = Router();

const mainRouter = require('./main');
const communityRouter = require('./community');
const shelterRouter = require('./shelter.js');

// 각 라우터별 요청 처리 js로 연결해줌.
router.use('/', mainRouter);
router.use('/community', communityRouter);
router.use('/shelter', shelterRouter);

module.exports = router;
