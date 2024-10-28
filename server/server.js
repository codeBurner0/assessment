"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var database_1 = require("./src/config/database");
var contact_routes_1 = __importDefault(require("./src/routes/contact.routes"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
database_1.AppDataSource.initialize()
    .then(function () {
    console.log('Data Source initialized');
    app.listen(5000, function () { return console.log('Server running on port 5000'); });
})["catch"](function (err) {
    console.error('Error during Data Source initialization', err);
});
app.use('/api', contact_routes_1["default"]);
