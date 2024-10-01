import { Poll } from '../models/Poll.js';

export async function createPoll(req, res) {
    try {
        const { title, description, options } = req.body;
        const creatorId = req.user.userId;

        const pollId = await Poll.create(title, description, creatorId);

        for (let option of options) {
            await Poll.addOption(pollId, option);
        }

        res.status(201).json({ message: '投票創建成功', pollId });
    } catch (error) {
        console.error('創建投票時發生錯誤:', error);
        res.status(500).json({ message: '伺服器錯誤' });
    }
}

export async function getPoll(req, res) {
    try {
        const pollId = req.params.id;
        const poll = await Poll.getById(pollId);
        if (!poll) {
            return res.status(404).json({ message: '投票不存在' });
        }
        const options = await Poll.getOptions(pollId);
        res.json({ ...poll, options });
    } catch (error) {
        console.error('獲取投票時發生錯誤:', error);
        res.status(500).json({ message: '伺服器錯誤' });
    }
}

export async function getAllPolls(req, res) {
    try {
        const polls = await Poll.getAll();
        res.json(polls);
    } catch (error) {
        console.error('獲取所有投票時發生錯誤:', error);
        res.status(500).json({ message: '伺服器錯誤' });
    }
}

export async function closePoll(req, res) {
    try {
        const pollId = req.params.id;
        const poll = await Poll.getById(pollId);

        if (!poll) {
            return res.status(404).json({ message: '投票不存在' });
        }

        if (poll.creator_id !== req.user.userId) {
            return res.status(403).json({ message: '你沒有權限關閉此投票' });
        }

        await Poll.updateStatus(pollId, 'closed');
        res.json({ message: '投票已關閉' });
    } catch (error) {
        console.error('關閉投票時發生錯誤:', error);
        res.status(500).json({ message: '伺服器錯誤' });
    }
}