import Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello Koa!' };
});

export default router;
