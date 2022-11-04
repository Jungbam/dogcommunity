const express = require('express');
const db = require('../config/connection');

const router = express.Router();

router.get('/community', async (req, res, next) => {
  try {
    const cursor = await db.collection('community').find({});
    const articles = await cursor.toArray();

    res.render('community', { articles });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
