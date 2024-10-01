import { query } from '../utils/dbSql.js';

export class Vote {
  static async create(userId, pollId, optionId) {
    const sql = 'INSERT INTO Votes (user_id, poll_id, option_id) VALUES (?, ?, ?)';
    const result = await query(sql, [userId, pollId, optionId]);
    return result.insertId;
  }

  static async getResultsByPollId(pollId) {
    const sql = `
      SELECT o.id, o.option_text, COUNT(v.id) as vote_count
      FROM Options o
      LEFT JOIN Votes v ON o.id = v.option_id
      WHERE o.poll_id = ?
      GROUP BY o.id
    `;
    return await query(sql, [pollId]);
  }

  static async hasUserVoted(userId, pollId) {
    const sql = 'SELECT COUNT(*) as count FROM Votes WHERE user_id = ? AND poll_id = ?';
    const result = await query(sql, [userId, pollId]);
    return result[0].count > 0;
  }
}