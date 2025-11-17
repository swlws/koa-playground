import Router from '@koa/router';
import homeRouter from './home.mjs';
import videoRouter from './video.mjs';

const prefix = '/api';

const router = new Router();

// 聚合子路由
router.use(prefix, homeRouter.routes(), homeRouter.allowedMethods());
router.use(
  `${prefix}/video`,
  videoRouter.routes(),
  videoRouter.allowedMethods()
);

export default router;
