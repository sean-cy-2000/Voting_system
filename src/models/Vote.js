import { query } from '../utils/dbSql.js';

export class Vote {
  static async create(userId, pollId, optionIds) {
    const sql = 'INSERT INTO Votes (user_id, poll_id, option_id) VALUES ?';
    /*mysql2語法：用 VALUES ? 取代 VALUES (?, ?, ?)，可以把輸入的二維數組轉成多個 VALUES (?, ?, ?)
      例如：a = [[1, 1, 1],[1, 1, 2]];
      INSERT INTO Votes (user_id, poll_id, option_id) VALUES ?', [values]
      就會自動轉換成：
      INSERT INTO Votes (user_id, poll_id, option_id) VALUES (1, 1, 1), (1, 1, 2);
    */
    const values = optionIds.map(optionId => [userId, pollId, optionId]);
    const result = await query(sql, [values]);
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