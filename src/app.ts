import koa from 'koa';
import koaBody from 'koa-body';

import errorHandler from './middleware/errorHandler';

import { router } from './routes/ping';

const app: koa = new koa();

// Middlewares
app.use(errorHandler);
app.use(koaBody())

// Business Logic Routing
app.use(router.routes()).use(router.allowedMethods());

export default app;
