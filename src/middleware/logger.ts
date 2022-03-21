import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  defaultMeta: { service: 'user-api' },
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console(),
  );
}
