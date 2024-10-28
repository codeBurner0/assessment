import { Contact } from '../models/contact.entity';
import { AppDataSource } from '../config/database';

const contactRepository = AppDataSource.getRepository(Contact);

export const getAllContacts = async (page: number, limit: number) => {
  const [contacts, total] = await contactRepository.findAndCount({
    where: { isDeleted: false },
    order: { name: 'ASC' },
    skip: (page - 1) * limit,
    take: limit,
  });
  return { contacts, total };
};
