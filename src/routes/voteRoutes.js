import express from 'express';
import { castVote, getPollResults } from '../controllers/voteController.js';
import { loginCheckToken } from '../middlewares/loginCheck.js';

const router = express.Router();

router.post('/', loginCheckToken, castVote);
router.get('/:id/results', getPollResults);

export default router;