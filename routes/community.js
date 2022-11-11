const { Router } = require('express');
const db = require('../config/connection');

const router = Router();

async function appendComments(article) {
  const articleId = article._id.toString();

  const query = { articleId };
  const options = { createdAt: -1, projection: { articleId: 0 } };

  const comments = await db
    .collection('comments')
    .find(query, options)
    .toArray();

  if (comments.length) {
    const newArticle = Object.assign(article, { comments });

    return newArticle;
  }
  return article;
}

router.post('/', async (req, res, next) => {
  try {
    const { title, content } = req.body;

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
    const { openArticle } = req.query;

    const countOfArticles = await db.collection('community').countDocuments();
    const maxIndex = Math.ceil(countOfArticles / 20);

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * 20,
      limit: 20,
    };

    const articles = await db
      .collection('community')
      .find(query, options)
      .toArray();

    const newArticles = await Promise.all(
      articles.map(async (article) => await appendComments(article)),
    );

    const board = {
      maxIndex,
      newArticles,
    };

    if (openArticle) {
      board.openArticle = openArticle;
    }

    res.render('community', board);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/comments', async (req, res, next) => {
  try {
    const { content, openArticle, page: currentPage } = req.body;
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

    await db.collection('comments').insertOne(comment);

    res.redirect(`/community?page=${currentPage}&openArticle=${openArticle}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
