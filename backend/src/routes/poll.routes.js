import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { create, getById, getByUser, getResults } from '../controllers/poll.controller';

const router = express.Router();

router.use(protect);

router.post('/', create);
router.get('/user', getByUser);
router.get('/:id', getById);
router.get('/:id/results', getResults);

export default router;