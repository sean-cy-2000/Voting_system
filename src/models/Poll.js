import { query } from '../utils/dbSql.js';

export class Poll {

    //  
    static async create(title, description, creatorId, multiChoice) {
        const sql = 'INSERT INTO Polls (title, description, creator_id, multiChoice) VALUES (?,?,?,?)';
        const result = await query(sql, [title, description, creatorId, multiChoice]);
        return result.insertId; // insertId 是該資料表的「自動增加的id」的那一欄位，無論該欄位的名稱是什麼。
    }

    static async getById(id) {
        const sql = 'SELECT * FROM Polls WHERE id = ?';
        const polls = await query(sql, [id]);
        return polls[0];
    }

    static async getAll() {
        const sql = 'SELECT * FROM Polls ORDER BY created_at DESC';
        return await query(sql);
    }

    static async update(id, title, description) {
        const sql = 'UPDATE Polls SET title = ?, description = ? WHERE id = ?';
        await query(sql, [title, description, id]);
    }

    static async updateStatus(id, status) {
        const sql = 'UPDATE Polls SET status = ? WHERE id = ?';
        await query(sql, [status, id]);
    }

    static async delete(id) {
        const sql = 'DELETE FROM Polls WHERE id = ?';
        await query(sql, [id]);
    }

    static async addOption(pollId, optionText) {
        const sql = 'INSERT INTO Options (poll_id, option_text) VALUES (?, ?)';
        const result = await query(sql, [pollId, optionText]);
        return result.insertId;
    }

    static async getOptions(pollId) {
        const sql = 'SELECT * FROM Options WHERE poll_id = ?';
        return await query(sql, [pollId]);
    }

    static async getjoinedPolls(userId) {
        const sql = `
          SELECT DISTINCT p.* 
          FROM Polls p 
          JOIN Votes v ON p.id = v.poll_id 
          WHERE v.user_id = ? 
          ORDER BY p.created_at DESC
        `;
        return await query(sql, [userId]);
      }
}