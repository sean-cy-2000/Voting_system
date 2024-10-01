// src/routes/pollRoutes.js
import express from 'express';
import { PollController } from '../controllers/pollController.js';
import { loginCheckToken } from '../middlewares/loginCheck.js';

const router = express.Router();

router.post('/', loginCheckToken, PollController.createPoll);
router.get('/:id', PollController.getPoll);
router.get('/', PollController.getAllPolls);
router.get('/user/created', loginCheckToken, PollController.getUserCreatedPolls);
router.get('/user/joined', loginCheckToken, PollController.getUserJoinedPolls);
router.put('/:id/close', loginCheckToken, PollController.closePoll);

export default router;