const express = require('express');
const db = require('../config/connection');
const logger = require('../config/winston');

const router = express.Router();

router.post('/community', async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const article = {
      title,
      content,
      createdAt: Date.now(),
    };

    await db.collection('community').insertOne(article);

    res.redirect('/board/community');
  } catch (err) {
    next(err);
  }
});

router.get('/community', async (req, res, next) => {
  try {
    const countOfArticles = await db.collection('community').countDocuments();
    const maxIndex = Math.ceil(countOfArticles / 20);

    const page = req.query.page || 1;

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * 20,
      limit: 20,
    };

    const cursor = db.collection('community').find(query, options);
    const articles = await cursor.toArray();

    const board = {
      maxIndex,
      articles,
    };

    res.json(board);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
