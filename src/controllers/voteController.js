// src/controllers/voteController.js
import { Vote } from '../models/Vote.js';
import { Poll } from '../models/Poll.js';

export class VoteController {
  static async castVote(req, res) {
    try {
      const { pollId, optionIds } = req.body;
      const userId = req.user.userId;

      const poll = await Poll.getById(pollId);
      if (!poll) {
        return res.status(404).json({ message: '投票不存在' });
      }

      if (poll.status === 'closed') {
        return res.status(400).json({ message: '此投票已關閉' });
      }

      const hasVoted = await Vote.hasUserVoted(userId, pollId);
      if (hasVoted) {
        return res.status(400).json({ message: '你已經在這個投票中投過票了' });
      }

      if (!poll.multiChoice && optionIds.length > 1) {
        return res.status(400).json({ message: '此投票不允許多選' });
      }

      await Vote.create(userId, pollId, optionIds);
      res.json({ message: '投票成功' });
    } catch (error) {
      console.error('投票時發生錯誤:', error);
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }

  static async getPollResults(req, res) {
    try {
      const pollId = req.params.id;
      const results = await Vote.getResultsByPollId(pollId);
      res.json(results);
    } catch (error) {
      console.error('獲取投票結果時發生錯誤:', error);
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }
}