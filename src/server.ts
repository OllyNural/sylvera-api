import koa from 'koa';
import koaBody from 'koa-body';

const PORT:number = Number(process.env.PORT) || 3000;

import errorHandler from './middleware/errorHandler';
import { logger } from './middleware/logger';

import { router } from './routes/ping';

const app: koa = new koa();

// Middlewares
app.use(errorHandler);
app.use(koaBody())

// Business Logic Routing
app.use(router.routes()).use(router.allowedMethods());

// export default app;


// Start host
const server = app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
  
  export { server };
