import express from 'express';
import { createPoll, getPoll, getAllPolls, closePoll } from '../controllers/pollController.js';
import { loginCheckToken } from '../middlewares/loginCheck.js';

const router = express.Router();

router.post('/', loginCheckToken, createPoll);
router.get('/:id', getPoll);
router.get('/', getAllPolls);
router.put('/:id/close', loginCheckToken, closePoll);

export default router;