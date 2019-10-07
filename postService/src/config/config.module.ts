import { Module, DynamicModule, Provider } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({})	
export class ConfigModule {

	public static register(configObject?: any): DynamicModule {

		const configService: Provider<ConfigService> = {
			provide:  ConfigService,
			useValue: new ConfigService(configObject),
		};

		return {
			module:    ConfigModule,
			providers: [configService],
			exports:   [configService],
		};
	}

}
