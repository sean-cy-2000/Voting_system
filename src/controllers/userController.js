import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../utils/dbSql.js';

// 註冊方法
export async function registUser(req, res) {
  const { username, password } = req.body;

  try {
    // 檢查用戶名是否已存在
    const existingUser = await query('SELECT * FROM Users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: '用戶名已存在' });
    }

    // 加密密碼，第二個參數為鹽值，越大越安全單也越花時間
    const passwordHash = await bcrypt.hash(password, 5);

    // 創建新用戶
    await query('INSERT INTO Users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);

    res.status(201).json({ message: '用戶註冊成功' });
  } catch (error) {
    console.error('註冊用戶時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
}

// 登入方法
export async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // 檢查用戶是否存在
    const users = await query('SELECT * FROM Users WHERE username = ?', [username]);
    if (users.length === 0) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' });
    }

    const user = users[0];

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '用戶名或密碼錯誤' });
    }

    // 生成 JWT, jwt.sign(要加密的內容, 密鑰, 各種設定，例如expiresIn是持續時間)
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: '登錄成功', token });
  } catch (error) {
    console.error('登錄時發生錯誤:', error);
    res.status(500).json({ message: '伺服器錯誤' });
  }
}

export function getProfile(req, res) {
  // req.user 是在 loginCheckToken 中間件設置的
  res.json({ message: "已獲取個人資料：", user: req.user });
}