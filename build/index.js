"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//const imageRoutes = require('./routes/image');
var image_1 = __importDefault(require("./routes/image"));
var image_2 = __importDefault(require("./apis/image"));
var app = (0, express_1.default)();
var port = 5000;
app.use('/api', image_1.default.get('/imageResize', image_2.default));
/*function printMessage() {
    return ('Jasmine configured properly!');
}
*/
app.listen(port, function () { return console.log("App is listening on port ".concat(port)); });
exports.default = app;
