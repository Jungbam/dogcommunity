const express = require('express');
const cors = require('cors');

const router = express.Router();

const pageRouter = require('./pages');
const api = require('./v1');

router.use(cors());
// 각 라우터별 요청 처리 js로 연결해줌.
router.use('/', pageRouter);
router.use('/v1', api);

module.exports = router;
