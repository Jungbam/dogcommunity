const { Router } = require('express');
const db = require('../config/connection');
const upload = require('../config/multer');
const path = require('path');
const logger = require('../config/winston');

const router = Router();

router.post('/', upload.array('image', 5), async (req, res, next) => {
  try {
    const { title, content, missingDate, contact, location, pages } = req.body;
    const currentPage = pages.split(',')[1];
    const uploadedImages = req.files;

    if (!title || !content || !missingDate || !contact || !location) {
      const err = new Error();
      err.message = 'Bad Request';
      err.status = 400;
      throw err;
    }

    const article = {
      title,
      content,
      missingDate,
      contact,
      location,
      createdAt: Date.now(),
    };

    if (uploadedImages.length) {
      const savedImages = uploadedImages.map((file) =>
        path.join('image', file.filename),
      );

      article.images = savedImages;
    }

    await db.collection('missing').insertOne(article);

    res.redirect(`/shelter?abandoned=${currentPage || 1}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
