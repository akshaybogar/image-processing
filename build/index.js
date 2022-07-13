"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageRoutes = require('./routes/image');
var app = (0, express_1.default)();
var port = 5000;
app.use('/api', imageRoutes.routes);
/*function printMessage() {
    return ('Jasmine configured properly!');
}
*/
app.listen(port, function () { return console.log("App is listening on port ".concat(port)); });
exports.default = app;
