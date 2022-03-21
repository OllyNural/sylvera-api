import koa, { HttpError } from 'koa';

import { logger } from './logger';

const buildRequestInfo = (ctx: koa.Context) => {
    return {
      url: ctx.request.url,
    };
}

const errorHandler = async (ctx: koa.Context, next: () => Promise<any>) => {
  try {
      const reqInfo = buildRequestInfo(ctx);
    logger.info({reqInfo});
    // @TODO - Add better logging with request timestamp etc
    await next();
    const { message, status } = ctx.response;
    logger.info({reqInfo, message, status });
  } catch (e) {
    if (e instanceof HttpError) {
      ctx.status = e.statusCode || e.status || 500;
      e.status = ctx.status;
      ctx.body = { e };
      ctx.app.emit('e', e, ctx);
    } else {
      const error = e as Error;
      const { message, stack } = error;
      logger.error({ message, stack, status: 500 });
      ctx.status = 500;
    }
  }
};

export default errorHandler;
