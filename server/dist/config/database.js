"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("../models/contact.entity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.Host,
    port: +process.env.Port,
    username: process.env.DB_Username,
    password: process.env.DB_Password,
    database: process.env.Database,
    entities: [contact_entity_1.Contact],
    synchronize: true,
});
