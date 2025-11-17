import Router from 'koa-router';
import { getUser, login } from '../interface/user.mjs';
const router = new Router();

// GET /user/info
router.get('/info', getUser);

// POST /user/login
router.post('/login', login);

export default router;
