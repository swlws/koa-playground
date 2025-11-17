import Router from '@koa/router';
import { getStaticVideo } from '../interface/video.mjs';

const router = new Router();

// GET /video/:filename
router.get('/:filename', getStaticVideo);

export default router;
