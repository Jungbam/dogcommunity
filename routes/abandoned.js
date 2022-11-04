const express = require('express');
const db = require('../config/connection');
const logger = require('../config/winston');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { title, content, missingDate, contact, region, imgURL } = req.body;

    const animalInfo = {
      title,
      content,
      missingDate,
      contact,
      region,
      imgURL,
      createdAt: Date.now(),
    };

    await db.collection('abandoned').insertOne(animalInfo);

    res.redirect('/abandoned');
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const imgURL =
      'http://image.newsis.com/2022/03/17/NISI20220317_0018600863_web.jpg';
    const title = '테스트';
    const comment = '테스트입니다.';
    const region = '서울';
    const contact = '1234';

    const board = [
      {
        imgURL,
        title,
        comment,
        region,
        contact,
      },
      {
        imgURL,
        title,
        comment,
        region,
        contact,
      },
      {
        imgURL,
        title,
        comment,
        region,
        contact,
      },
    ];

    res.render('abandoned', { animalInfo: board });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
