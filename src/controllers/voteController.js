// src/controllers/voteController.js
import { Vote } from '../models/Vote.js';
import { Poll } from '../models/Poll.js';

export async function castVote(req, res) {
  try {
    const { pollId, optionId } = req.body;
    const userId = req.user.userId;

    // 檢查投票狀態
    const pollStatus = await Poll.getStatus(pollId);
    if (!pollStatus) {
      return res.status(404).json({ message: '投票不存在' });
    }
    if (pollStatus === 'closed') {
      return res.status(400).json({ message: '此投票已關閉，無法進行投票' });
    }

    // 確認自己之於該投票的關係
    const hasVoted = await Vote.hasUserVoted(userId, pollId);
    if (hasVoted) {
      return res.status(400).json({ message: '你已經在這個投票中投過票了' });
    }

    await Vote.create(userId, pollId, optionId);
    res.json({ message: '投票成功' });
  } catch (error) {
    console.error('投票時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
}

export async function getPollResults(req, res) {
  try {
    const pollId = req.params.id;
    const results = await Vote.getResultsByPollId(pollId);
    res.json(results);
  } catch (error) {
    console.error('獲取投票結果時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
}