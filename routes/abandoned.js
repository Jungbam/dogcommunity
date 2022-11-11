const { Router } = require('express');
const db = require('../config/connection');
const upload = require('../config/multer');
const path = require('path');

const router = Router();

router.post('/', upload.array('image', 5), async (req, res, next) => {
  try {
    const { title, content, contact, location, pages } = req.body;
    const currentPage = pages.split(',')[0];
    const uploadedImages = req.files;

    if (!title || !content || !contact || !location) {
      const err = new Error();
      err.message = 'Bad Request';
      err.status = 400;
      throw err;
    }

    const article = {
      title,
      content,
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

    await db.collection('abandoned').insertOne(article);

    res.redirect(`/shelter?missing=${currentPage || 1}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
