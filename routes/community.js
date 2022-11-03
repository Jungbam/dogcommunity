const express = require('express');
const client = require('../db/connection');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('community', { title: '길 잃은 동물들의 이야기' });
});

router.post('/', async (req, res, next) => {
  try {
    const db = client.db('test'); // test db에 연결

    const doc = {
      comment: req.body.comment,
    };

    await db.collection('sample').insertOne(doc); //db에 저장

    await db.collection('sample').find({}).forEach(console.dir); //db 확인용

    res.redirect('/'); // 새로고침
  } finally {
    await client.close(); // 연결 해제
  }
});

module.exports = router;
