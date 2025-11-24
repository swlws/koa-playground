import Router from '@koa/router';
import { getStaticVideo } from '../interface/video.mjs';

const router = new Router();

router.get('/sse', getStaticVideo);

export default router;
