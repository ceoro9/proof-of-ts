import winston, { format } from 'winston';

export const logger = winston.createLogger();

const consoleLoggerFormat = format.combine(
	format.json(),
	format.metadata(),
	format.colorize(),
	format.timestamp(), // TODO: does not work
);

logger.add(new winston.transports.Console({
	format: consoleLoggerFormat,
	handleExceptions: true,
}));
