const express = require('express');
const { resizeImage } = require('../apis/image');
const router = express.Router();

router.get('/imageResize', resizeImage);

module.exports = {
  routes: router,
};
