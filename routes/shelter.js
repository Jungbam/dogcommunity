const { Router } = require('express');
const db = require('../config/connection');
const router = Router();

const missingRouter = require('./missing');
const abandonedRouter = require('./abandoned');

router.use('/missing', missingRouter);
router.use('/abandoned', abandonedRouter);

router.get('/', async (req, res, next) => {
  try {
    const pageOfAbandoned = parseInt(req.query.abandoned) || 1;
    const pageOfMissing = parseInt(req.query.abandoned) || 1;

    const countOfAbandoned = await db.collection('abandoned').countDocuments();
    const maxIndexOfAbandoned = Math.ceil(countOfAbandoned / 20);
    const countOfMissing = await db.collection('missing').countDocuments();
    const maxIndexOfMissing = Math.ceil(countOfMissing / 20);

    const queryOfAbandoned = {};
    const optionsOfAbandoned = {
      sort: { createdAt: -1 },
      skip: (pageOfAbandoned - 1) * 20,
      limit: 20,
    };
    const queryOfMissing = {};
    const optionsOfMissing = {
      sort: { createdAt: -1 },
      skip: (pageOfMissing - 1) * 20,
      limit: 20,
    };

    const cursorOfAbandoned = db
      .collection('abandoned')
      .find(queryOfAbandoned, optionsOfAbandoned);
    const articlesOfAbandoned = await cursorOfAbandoned.toArray();
    const cursorOfMissing = db
      .collection('missing')
      .find(queryOfMissing, optionsOfMissing);
    const articlesOfMissing = await cursorOfMissing.toArray();

    const boardOfAbandoned = {
      maxIndex: maxIndexOfAbandoned,
      articles: articlesOfAbandoned,
    };

    const boardOfMissing = {
      maxIndex: maxIndexOfMissing,
      articles: articlesOfMissing,
    };

    res.render('abandoned', { boardOfAbandoned, boardOfMissing });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
