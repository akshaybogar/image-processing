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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var imageResize_1 = __importDefault(require("../utilities/imageResize"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var processedImagesFolder = path_1.default.join(__dirname, '../../processed_images');
var request = (0, supertest_1.default)(index_1.default);
describe('imageResize api response test', function () {
    it('checks for the presence of height and width query params', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/imagereSize?filename=abcd.jpeg')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.text).toEqual('Height and Width of the image to be displayed not provided!');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('imageResize api response test', function () {
    it('checks for the presence of filename', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/imagereSize?filename=waterfal.jpeg&width=100&height=100')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.text).toEqual('File does not exist! Please choose from : port.jpeg, scenicview.jpeg, tunnel.jpeg, waterfall.jpeg');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('imageResize api response test', function () {
    it('validating if value assigned to width is an integer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/imagereSize?filename=waterfall.jpeg&width=abcd&height=100')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.text).toEqual('Provided width value is not integer!');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('imageResize api response test', function () {
    it('validating if value assigned to height is an integer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/imagereSize?filename=waterfall.jpeg&width=200&height=i')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    expect(response.text).toEqual('Provided height value is not integer!');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('imageResize api response test', function () {
    it('successful retuen of resized image', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api/imagereSize?filename=waterfall.jpeg&width=200&height=200')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('check if image is resized and stored in processed_images folder', function () {
    it('successful retuen of resized image', function () { return __awaiter(void 0, void 0, void 0, function () {
        var filename, width, height, processedImageFilePath, imagePath, filePresence;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = 'waterfall.jpeg';
                    width = 700;
                    height = 700;
                    processedImageFilePath = path_1.default.join(processedImagesFolder, filename.split('.')[0] +
                        '_' +
                        width.toString() +
                        '_' +
                        height.toString() +
                        '.' +
                        filename.split('.')[1]);
                    console.log('File to be created', processedImageFilePath);
                    if (fs_1.default.existsSync(processedImageFilePath)) {
                        console.log('file exists! deleting...');
                        fs_1.default.unlinkSync(processedImageFilePath);
                    }
                    return [4 /*yield*/, (0, imageResize_1.default)(filename, width, height)];
                case 1:
                    imagePath = _a.sent();
                    filePresence = fs_1.default.existsSync(processedImageFilePath);
                    expect(imagePath).toEqual(processedImageFilePath);
                    expect(filePresence).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
