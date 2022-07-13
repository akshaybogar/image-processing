"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
//const { resizeImage } = require('../apis/image');
var image_1 = __importDefault(require("../apis/image"));
var router = express.Router();
router.get('/imageResize', image_1.default);
module.exports = {
    routes: router,
};
