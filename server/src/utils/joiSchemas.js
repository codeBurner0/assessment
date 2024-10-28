"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.contactSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.contactSchema = joi_1["default"].object({
    name: joi_1["default"].string().required(),
    email: joi_1["default"].string().email().required(),
    color: joi_1["default"].string().required(),
    colorIcon: joi_1["default"].string().required(),
    imageUrl: joi_1["default"].string().allow(''),
    phoneNumber1: joi_1["default"].string().length(10).pattern(/^\d+$/).required(),
    phoneNumber2: joi_1["default"].string().length(10).pattern(/^\d+$/).optional(),
    address: joi_1["default"].string().required()
});
