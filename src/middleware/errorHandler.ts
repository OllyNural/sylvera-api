import koa, { HttpError } from 'koa';

import { logger } from './logger';

const buildRequestInfo = (ctx: koa.Context) => {
  return {
    url: ctx.request.url,
    reqBody: ctx.request.body,
    method: ctx.request.method,
  };
};

const errorHandler = async (ctx: koa.Context, next: () => Promise<any>) => {
  try {
    const reqInfo = buildRequestInfo(ctx);
    logger.info({ ...reqInfo });
    // @TODO - Add better logging with request timestamp etc
    await next();
    const { message, status } = ctx.response;
    logger.info({ message, status });
  } catch (e) {
    if (e instanceof HttpError) {
      const { status, message } = e;
      ctx.status = status;
      ctx.body = message;
      logger.error({ error: e, status: 500 });
    } else {
      const error = e as Error;
      const { message, stack } = error;
      logger.error({ message, stack, status: 500 });
      ctx.status = 500;
    }
  }
};

export default errorHandler;
