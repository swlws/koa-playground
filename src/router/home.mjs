import Router from '@koa/router';
import { alive } from '../interface/home.mjs';
const router = new Router();

router.get('/alive', alive);

export default router;
