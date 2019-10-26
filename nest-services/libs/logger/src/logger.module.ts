import { Module, Provider }     from '@nestjs/common';
import { createLogger }         from 'winston';
import { WinstonLoggerService } from '@post-service/config/config.winston-logger-service';
import { ConfigModule }         from '@post-service/config/config.module';
import { ILogger }              from './logger.interface';


const winstonLoggerProvider: Provider = {
	provide:    ILogger,
	useFactory: (configService: WinstonLoggerService) => createLogger(configService.getConfig()),
	inject:     [WinstonLoggerService],
};


@Module({
	imports:   [ConfigModule],
	providers: [winstonLoggerProvider],
	exports:   [winstonLoggerProvider],
})
export class LoggerModule {}
