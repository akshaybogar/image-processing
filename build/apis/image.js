"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var image = require('../routes/image');
var path = require('path');
var imagesFolder = path.join(__dirname, '../../images');
var processedImagesFolder = path.join(__dirname, '../../processed_images');
var fs = require('fs');
var sharp = require('sharp');
var resizeImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, height, width;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                filename = req.query.filename;
                height = req.query.height;
                width = req.query.width;
                if (!width && !height) {
                    return [2 /*return*/, res
                            .status(400)
                            .send('Height and Width of the image to be displayed not provided!')];
                }
                if (!width) {
                    return [2 /*return*/, res
                            .status(400)
                            .send('Width of the image to be displayed not provided!')];
                }
                if (!height) {
                    return [2 /*return*/, res
                            .status(400)
                            .send('Height of the image to be displayed not provided!')];
                }
                height = parseInt(height);
                width = parseInt(width);
                if (Number.isNaN(width)) {
                    return [2 /*return*/, res.status(400).send('Provided width value is not integer!')];
                }
                if (Number.isNaN(height)) {
                    return [2 /*return*/, res.status(400).send('Provided height value is not integer!')];
                }
                if (fs.existsSync(path.join(imagesFolder, filename))) {
                    console.log('File exists!');
                }
                else {
                    return [2 /*return*/, res
                            .status(400)
                            .send('File does not exist! Please choose from : port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg')];
                }
                if (fs.existsSync(path.join(processedImagesFolder, filename.split('.')[0] +
                    '_' +
                    width.toString() +
                    '_' +
                    height.toString() +
                    '.' +
                    filename.split('.')[1]))) {
                    console.log('Rendering processed image');
                    return [2 /*return*/, res
                            .status(200)
                            .sendFile(path.join(processedImagesFolder, filename.split('.')[0] +
                            '_' +
                            width.toString() +
                            '_' +
                            height.toString() +
                            '.' +
                            filename.split('.')[1]))];
                }
                return [4 /*yield*/, sharp(path.join(imagesFolder, filename))
                        .resize(width, height)
                        .jpeg({ quality: 50 })
                        .toFile(path.join(processedImagesFolder, filename.split('.')[0] +
                        '_' +
                        width.toString() +
                        '_' +
                        height.toString() +
                        '.' +
                        filename.split('.')[1]))];
            case 1:
                _a.sent();
                res
                    .status(200)
                    .sendFile(path.join(processedImagesFolder, filename.split('.')[0] +
                    '_' +
                    width.toString() +
                    '_' +
                    height.toString() +
                    '.' +
                    filename.split('.')[1]));
                return [2 /*return*/];
        }
    });
}); };
exports.default = resizeImage;
