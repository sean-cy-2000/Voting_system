import express from 'express';
import { registUser, loginUser, getProfile } from '../controllers/userController.js';
import { loginCheckToken } from '../middlewares/loginCheck.js';

const router = express.Router();

router.post('/register', registUser);
router.post('/login', loginUser);
//當客户端發送一個 POST 請求到 /register 或 /login 時，就會執行後面的程式

router.get('/profile', loginCheckToken, getProfile);
// 如果有三個參數，第二個參數就是中間件，


export default router;  //用defalt，這樣import時就不用加花括號