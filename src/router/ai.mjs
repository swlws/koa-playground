import Router from '@koa/router';
import { chatWithAI } from '../interface/ai.mjs';

const router = new Router();

router.post('/chat', chatWithAI);

export default router;
