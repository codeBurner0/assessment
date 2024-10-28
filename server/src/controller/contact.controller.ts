import { Request, Response } from 'express';
import { Contact } from '../models/contact.entity';
import { AppDataSource } from '../config/database';

const contactRepository = AppDataSource.getRepository(Contact);

// Create Contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = contactRepository.create(req.body);
    await contactRepository.save(contact);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

// Get All Contacts with Pagination
export const getContacts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const [contacts, total] = await contactRepository.findAndCount({
      where: { isDeleted: false },
      order: { name: 'ASC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    res.json({ data: contacts, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// Update Contact
export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contact = await contactRepository.findOneBy({ id: parseInt(id) });

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    Object.assign(contact, req.body);
    await contactRepository.save(contact);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

// Soft Delete Contact
export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contact = await contactRepository.findOneBy({ id: parseInt(id) });

    if (!contact || contact.isDeleted) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.isDeleted = true;
    await contactRepository.save(contact);
    res.json({ message: 'Contact soft-deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};

// Search Contacts
export const searchContacts = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const contacts = await contactRepository
      .createQueryBuilder('contact')
      .where('(contact.firstName LIKE :query OR contact.lastName LIKE :query OR contact.email LIKE :query)', { query: `%${query}%` })
      .andWhere('contact.isDeleted = false')
      .orderBy('contact.firstName', 'ASC')
      .getMany();

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error searching contacts', error });
  }
};
