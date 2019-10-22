import { Module, Scope }           from '@nestjs/common';

import { ConfigModule }            from '../config';
import { LoggerModule }            from '../logger';

import { ConfigService }           from '../config/config.service';
import { ILogger }                 from '../logger/logger.interface';

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
