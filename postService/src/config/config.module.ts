import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
	exports:   [ConfigService],
	providers: [ConfigService],
})
export class ConfigModule {

	public static register(configObject?: any): DynamicModule {
		return {
			module: this,
			providers: [
				{
					provide:  ConfigService,
					useValue: new ConfigService(configObject),
				}
			],
			exports: [ConfigService],
		}
	}

}
