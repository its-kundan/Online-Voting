import express from 'express';
import { protect } from '../middleware/auth.middleware';
import { vote } from '../controllers/vote.controller';

const router = express.Router();

router.use(protect);

router.post('/:pollId', vote);

export default router;