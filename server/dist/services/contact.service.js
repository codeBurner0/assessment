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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContacts = void 0;
const contact_entity_1 = require("../models/contact.entity");
const database_1 = require("../config/database");
const contactRepository = database_1.AppDataSource.getRepository(contact_entity_1.Contact);
const getAllContacts = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const [contacts, total] = yield contactRepository.findAndCount({
        where: { isDeleted: false },
        order: { name: 'ASC' },
        skip: (page - 1) * limit,
        take: limit,
    });
    return { contacts, total };
});
exports.getAllContacts = getAllContacts;
