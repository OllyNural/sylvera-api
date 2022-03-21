import koa from 'koa';
import koaBody from 'koa-body';

const PORT:number = Number(process.env.PORT) || 3000;

import errorHandler from './middleware/errorHandler';
import { logger } from './middleware/logger';

import { router } from './routes/routes';

const app: koa = new koa();

// Middlewares
app.use(koaBody());
app.use(errorHandler);

// Business Logic Routing
app.use(router.routes()).use(router.allowedMethods());

// Start host
const server = app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});

export { server };
