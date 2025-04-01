import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { vote } from '../controllers/vote.controller.js';

const router = express.Router();

router.use(protect);

router.post('/:pollId', vote);

export default router;