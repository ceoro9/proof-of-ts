import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ConfigService }                   from './config.service';
import { WinstonLoggerService }            from './config.winston-logger-service';

@Module({
	providers: [WinstonLoggerService],
	exports:   [WinstonLoggerService],
})	
export class ConfigModule {

	public static register(configObject?: any): DynamicModule {

		const configService: Provider<ConfigService> = {
			provide:  ConfigService,
			useValue: new ConfigService(configObject),
		};

		return {
			module: ConfigModule,
			providers: [
				WinstonLoggerService,
				configService,
			],
			exports: [
				WinstonLoggerService,
				configService,
			],
		};
	}

}
