import Router from '@koa/router';
import { uploadFile } from '../interface/file.mjs';
const router = new Router();

router.post('/upload', uploadFile);

export default router;
