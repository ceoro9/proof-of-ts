import { Module, Scope }           from '@nestjs/common';

import { ConfigModule }            from '../libs/config/src';
import { LoggerModule }            from '../libs/logger/src';

import { ConfigService }           from '../config/config.service';
import { ILogger }                 from '../libs/logger/src/logger.interface';

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
