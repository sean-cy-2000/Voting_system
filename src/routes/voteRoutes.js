// src/routes/voteRoutes.js
import express from 'express';
import { VoteController } from '../controllers/voteController.js';
import { loginCheckToken } from '../middlewares/loginCheck.js';

const router = express.Router();

router.post('/', loginCheckToken, VoteController.castVote);
router.get('/:id/results', VoteController.getPollResults);

export default router;