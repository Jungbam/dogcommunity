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
    const { title, content, lostDate, contact, region } = req.body;

    const article = {
      title,
      content,
      lostDate,
      contact,
      region,
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
    const { title, content, foundDate, contact, region } = req.body;

    const article = {
      title,
      content,
      foundDate,
      contact,
      region,
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
