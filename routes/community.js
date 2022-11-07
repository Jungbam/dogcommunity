const { Router } = require('express');
const db = require('../config/connection');
const upload = require('../config/multer');
const path = require('path');

const router = Router();

router.post('/', upload.array('image', 5), async (req, res, next) => {
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
      deletedAt: null,
    };

    if (uploadedImages.length) {
      const savedImages = uploadedImages.map((file) =>
        path.join('image', file.filename),
      );

      article.images = savedImages;
    }

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

    const query = { deletedAt: null };
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

    res.render('community', board);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
