import Router from 'koa-router';
const router = new Router();

// GET /user/info
router.get('/info', async (ctx) => {
  ctx.body = {
    id: 1,
    name: 'wenlong',
    role: 'admin',
  };
});

// POST /user/login
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  if (username === 'admin' && password === '123456') {
    ctx.body = { success: true, token: 'xxxx-token' };
  } else {
    ctx.body = { success: false };
  }
});

export default router;
