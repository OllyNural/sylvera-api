
import { Context } from 'koa';
import koaRouter from 'koa-router';
import { logger } from '../middleware/logger';
const router = new koaRouter();

router.get('/ping', (ctx: Context) => {
  logger.info('Hit main route');
  ctx.body = 'Pong!';
});

export { router };
