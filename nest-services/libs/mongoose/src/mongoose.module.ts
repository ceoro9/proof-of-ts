import { Module, Scope }           from '@nestjs/common';

import { ConfigModule }            from '@post-service/config';
import { LoggerModule }            from '@post-service/logger';

import { ConfigService }           from '@post-service/config/config.service';
import { ILogger }                 from '@post-service/logger/logger.interface';

import { MongooseService }         from './mongoose.service';
import { MongooseSessionService }  from './session.service';


const mongooseSessionProvider = {
	provide: MongooseSessionService,
	scope: Scope.REQUEST,
	useFactory: async (logger: ILogger,
										 configService: ConfigService,
										 mongooseService: MongooseService) => {
		return MongooseSessionService.startSession(logger, configService, mongooseService);
	},
	inject: [ILogger, ConfigService, MongooseService],
}


@Module({
	imports: [
		ConfigModule.register(),
		LoggerModule,
	],
	providers: [
		MongooseService,
		mongooseSessionProvider,
	],
	exports: [
		MongooseService,
		mongooseSessionProvider,
	],
})
export class MongooseModule {}
