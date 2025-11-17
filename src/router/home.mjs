import Router from 'koa-router';
import { alive } from '../interface/home.mjs';
const router = new Router();

router.get('/', alive);

export default router;
