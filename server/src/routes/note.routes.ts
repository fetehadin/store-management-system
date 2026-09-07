import { Router } from 'express';
import { getNotes, saveNote, deleteNote } from '../controllers/note.controller.js';
// THIS WAS THE CULPRIT LAST TIME. WE NOW USE THE EXACT CORRECT IMPORT:
import { authenticate } from '../middlewares/authenticate.js'; 

const router = Router();

router.use(authenticate); 

router.get('/', getNotes);
router.post('/', saveNote);
router.delete('/:dateKey', deleteNote);

export default router;