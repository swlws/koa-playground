import Router from '@koa/router';
import homeRouter from './home.mjs';
import videoRouter from './video.mjs';
import sseRouter from './sse.mjs';
import aiRouter from './ai.mjs';
import fileRouter from './file.mjs';

const prefix = '/api';

const router = new Router();

// 聚合子路由
router.use(prefix, homeRouter.routes(), homeRouter.allowedMethods());
router.use(
  `${prefix}/video`,
  videoRouter.routes(),
  videoRouter.allowedMethods()
);
router.use(`${prefix}/sse`, sseRouter.routes(), sseRouter.allowedMethods());
router.use(`${prefix}/ai`, aiRouter.routes(), aiRouter.allowedMethods());
router.use(`${prefix}/file`, fileRouter.routes(), fileRouter.allowedMethods());

export default router;
