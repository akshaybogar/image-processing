const express = require('express');
//const { resizeImage } = require('../apis/image');
import resizeImage from '../apis/image';
const router = express.Router();

router.get('/imageResize', resizeImage);

module.exports = {
  routes: router,
};
