const express = require('express');
const db = require('../config/connection');
const logger = require('../config/winston');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch {
  logger.warn('uploads 폴더가 없습니다!');
  fs.mkdirSync('uploads');
}

const upload = multer({});

router.post('/community', async (req, res, next) => {
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

router.post('/missing', async (req, res, next) => {
  try {
    const { title, content, missingDate, contact, location } = req.body;

    if (!title || !content || !missingDate || !contact || !location) {
      const err = new Error();
      err.message = 'Bad Request';
      err.status = 400;
      throw err;
    }

    const article = {
      title,
      content,
      lostDate,
      contact,
      location,
      createdAt: Date.now(),
    };

    await db.collection('missing').insertOne(article);

    res.redirect('/missing');
  } catch (err) {
    next(err);
  }
});

router.get('/missing', async (req, res, next) => {
  try {
    const countOfArticles = await db.collection('missing').countDocuments();
    const maxIndex = Math.ceil(countOfArticles / 20);

    const page = req.query.page || 1;

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * 20,
      limit: 20,
    };

    const cursor = db.collection('missing').find(query, options);
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

router.post('/abandoned', async (req, res, next) => {
  try {
    const { title, content, foundDate, contact, location } = req.body;

    if (!title || !content || !foundDate || !contact || !location) {
      const err = new Error();
      err.message = 'Bad Request';
      err.status = 400;
      throw err;
    }

    const article = {
      title,
      content,
      foundDate,
      contact,
      location,
      createdAt: Date.now(),
    };

    await db.collection('abandoned').insertOne(article);

    res.redirect('/abandoned');
  } catch (err) {
    next(err);
  }
});

router.get('/abandoned', async (req, res, next) => {
  try {
    const countOfArticles = await db.collection('abandoned').countDocuments();
    const maxIndex = Math.ceil(countOfArticles / 20);

    const page = req.query.page || 1;

    const query = {};
    const options = {
      sort: { createdAt: -1 },
      skip: (page - 1) * 20,
      limit: 20,
    };

    const cursor = db.collection('abandoned').find(query, options);
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
