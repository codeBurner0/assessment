import express from 'express';
import * as contactController from '../controller/contact.controller';
import { validate } from '../middlewares/validation.middleware';
import { contactSchema } from '../utils/joiSchemas';

const router = express.Router();

router.post('/contacts', validate(contactSchema), contactController.createContact);
router.get('/contacts', contactController.getContacts);
router.put('/contacts/:id', validate(contactSchema), contactController.updateContact);
router.delete('/contacts/:id', contactController.deleteContact);
router.get('/contacts/search', contactController.searchContacts);

export default router;
