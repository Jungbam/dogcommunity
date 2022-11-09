const { Router } = require('express');
const db = require('../config/connection');
const path = require('path');

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const uploadedImages = req.files;

    if (!title || !content) {
      const err = new Error();
      err.message = 'Bad Request';
      err.status = 400;
      throw err;
    }

    const article = {
      title,
      content,
      createdAt: Date.now(),
    };

    await db.collection('community').insertOne(article);

    res.redirect('/community');
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;

    const countOfArticles = await db.collection('community').countDocuments();
    const maxIndex = Math.ceil(countOfArticles / 20);

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * 20,
      limit: 20,
    };

    const cursor = db.collection('community').find(query, options);
    const articles = await cursor.toArray().map();

    const board = {
      maxIndex,
      articles,
    };

    res.render('community', board);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/comments', async (req, res, next) => {
  try {
    const { content } = req.body;
    const articleId = req.params.id;
    if (!content) {
      const err = new Error();
      err.message = 'Bad Request';
      err.status = 400;
      throw err;
    }

    const comment = {
      content,
      createdAt: Date.now(),
      articleId,
    };

    res.send('done');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
