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
exports.searchContacts = exports.deleteContact = exports.updateContact = exports.getContacts = exports.createContact = void 0;
const contact_entity_1 = require("../models/contact.entity");
const database_1 = require("../config/database");
const contactRepository = database_1.AppDataSource.getRepository(contact_entity_1.Contact);
// Create Contact
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = contactRepository.create(req.body);
        yield contactRepository.save(contact);
        res.status(201).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating contact', error });
    }
});
exports.createContact = createContact;
// Get All Contacts with Pagination
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const [contacts, total] = yield contactRepository.findAndCount({
            where: { isDeleted: false },
            order: { name: 'ASC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        res.json({ data: contacts, total, page, totalPages: Math.ceil(total / limit) });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
});
exports.getContacts = getContacts;
// Update Contact
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield contactRepository.findOneBy({ id: parseInt(id) });
        if (!contact || contact.isDeleted) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        Object.assign(contact, req.body);
        yield contactRepository.save(contact);
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating contact', error });
    }
});
exports.updateContact = updateContact;
// Soft Delete Contact
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contact = yield contactRepository.findOneBy({ id: parseInt(id) });
        if (!contact || contact.isDeleted) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        contact.isDeleted = true;
        yield contactRepository.save(contact);
        res.json({ message: 'Contact soft-deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
});
exports.deleteContact = deleteContact;
// Search Contacts
const searchContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const contacts = yield contactRepository
            .createQueryBuilder('contact')
            .where('(contact.name LIKE :query)', { query: `%${query}%` })
            .orderBy('contact.name', 'ASC')
            .getMany();
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error searching contacts', error });
    }
});
exports.searchContacts = searchContacts;
