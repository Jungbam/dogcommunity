const express = require('express');
const { FindCursor } = require('mongodb');
const db = require('../db/connection');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const cursor = await db.collection('community').find({});
    console.log(cursor);
    // const articles = await cursor.toArray();

    const articles = [
      {
        title: '하이',
        contact: '010-1234-5678',
        region: '서울',
        missingDate: Date().now,
        content: '테스트입니다.',
      },
      {
        title: '테스트2',
        contact: '010-1234-5678',
        region: '경기',
        missingDate: Date().now,
        content: '테스트2입니다.',
      },
    ];
    res.render('community', { articles });
  } catch (err) {
    next(err);
  }
});

router.get('/detail/1', async (req, res, next) => {
  try {
    const article = {
      title: '하이',
      contact: '010-1234-5678',
      region: '서울',
      missingDate: Date().now,
      content: '테스트입니다.',
    };
    res.render('article-detail', { article });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const doc = {
      title: req.body.title,
      contact: req.body.contact,
      region: req.body.region,
      missingDate: req.body.missingDate,
      content: req.body.content,
    };
    console.log(doc);
    await db.collection('community').insertOne(doc);

    res.redirect('/community');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
