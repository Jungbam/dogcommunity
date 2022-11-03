const express = require('express');

const router = express.Router();

const mainRouter = require('./main');
const missingRouter = require('./missing');
const abandonedRouter = require('./abandoned');
const communityRouter = require('./community');

router.use('/', mainRouter);
router.use('/missing', missingRouter);
router.use('/abandoned', abandonedRouter);
router.use('/community', communityRouter);

module.exports = router;
