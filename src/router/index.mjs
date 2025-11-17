import Router from '@koa/router';
import userRouter from './user.mjs';
import homeRouter from './home.mjs';

const router = new Router();

// 聚合子路由
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/', homeRouter.routes(), homeRouter.allowedMethods());

export default router;
