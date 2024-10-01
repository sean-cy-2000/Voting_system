import jwt from 'jsonwebtoken';

export function loginCheckToken(req, res, next) {
  let token;
  if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
    token = req.headers['authorization'].split(' ')[1];
  } else {
    return res.sendStatus(401);
  }
  //  如果req.headers['authorization']存在且以'Bearer '開頭，就把空格之後的值指定給token

  if (token == null) return res.status(401).json({message:'登入資訊錯誤'});

  // jwt.verify(要驗證的token字串, 密鑰, 回調函數(錯誤, 解密後的內容))
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: '無效的認證令牌' });  // 如果 err 存在則代表 token 無效，返回 403
    req.user = user;
    next();/*
    根據 ../routes/userRoutes.js 中的
    router.get('/profile', loginCheckToken, getProfile);
    next() 會執行瞎一個函數，也就是 getProfile
    並且可以使用 req.user 等等專間鍵的變數
    */
  });
}