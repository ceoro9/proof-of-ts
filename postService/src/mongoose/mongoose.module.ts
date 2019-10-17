import { Module, Provider, Scope } from '@nestjs/common';
import { ConfigModule }            from '../config/config.module';
import { MongooseService }         from './mongoose.service';
import { LoggerModule }            from '../logger/logger.module';
import { MongooseSessionService }  from './session.service';
import { ConfigService }           from '../config/config.service';
import { ILogger }                 from '../logger';

const mongooseSessionProvider = {
	provide: MongooseSessionService,
	scope: Scope.REQUEST,
	useFactory: async (logger: ILogger, configService: ConfigService, mongooseService: MongooseService) => {
		const result = await MongooseSessionService.startSession(logger, configService, mongooseService);
		return result;
	},
	inject: [ILogger, ConfigService, MongooseService],
}

@Module({
	imports: [
		ConfigModule.register('/home/ceoro9/ts_practive/proof-of-ts/postService/env-vars.env'),
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
