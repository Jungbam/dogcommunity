const express = require('express');
const { FindCursor } = require('mongodb');
const db = require('../config/connection');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cursor = await db.collection('community').find({});
    console.log(cursor);
    const articles = await cursor.toArray();

    res.render('community', { articles });
  } catch (err) {
    next(err);
  }
});

router.get('/detail/:id', async (req, res, next) => {
  try {
    const article = {};
    res.render('article-detail', { article });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const article = {
      title: req.body.title,
      contact: req.body.contact,
      region: req.body.region,
      missingDate: req.body.missingDate,
      content: req.body.content,
    };
    await db.collection('community').insertOne(article);

    res.redirect('/community');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
