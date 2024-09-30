import { query } from '../utils/dbSql.js';

export class Poll {
    
  static async create(title, description, creatorId, startDate, endDate) {
    const sql = 'INSERT INTO Polls (title, description, creator_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)';
    const result = await query(sql, [title, description, creatorId, startDate, endDate]);
    return result.insertId;
  }

  static async getById(id) {
    const sql = 'SELECT * FROM Polls WHERE id = ?';
    const polls = await query(sql, [id]);
    return polls[0];
  }

  static async getAll() {
    const sql = 'SELECT * FROM Polls ORDER BY start_date DESC';
    return await query(sql);
  }

  static async update(id, title, description, startDate, endDate, status) {
    const sql = 'UPDATE Polls SET title = ?, description = ?, start_date = ?, end_date = ?, status = ? WHERE id = ?';
    await query(sql, [title, description, startDate, endDate, status, id]);
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
}