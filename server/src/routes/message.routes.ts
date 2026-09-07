import { Router } from 'express';
import { getMessages, dismissMessage } from '../controllers/message.controller.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', getMessages);
router.patch('/:id/dismiss', dismissMessage);

export default router;