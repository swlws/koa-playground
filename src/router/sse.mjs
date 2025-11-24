import Router from '@koa/router';
import { keepAliveConnection } from '../interface/sse.mjs';

const router = new Router();

router.get('/', keepAliveConnection);

export default router;
