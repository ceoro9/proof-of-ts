import mongoose from 'mongoose';
import { Injectable, Scope } from '@nestjs/common';
import { ConfigService }     from '../config/config.service';
import { ILogger }           from '../logger/logger.interface';
import { MongooseService }   from './mongoose.service';

@Injectable({ scope: Scope.REQUEST })
export class MongooseSessionService {

	private session?: mongoose.ClientSession;
	private sessionPromise?: Promise<mongoose.ClientSession>;

	public static async startSession(logger: ILogger, configService: ConfigService, mongooseService: MongooseService) {
		const service = new MongooseSessionService(logger, configService, mongooseService);
		await service.getSessionPromise();
		return service;
	}

	public constructor(private logger: ILogger,
										 private configService: ConfigService,
										 private mongooseService: MongooseService) {
		this.session = void 0;
		this.setUpSession();
	}

	public async setUpSession() {
		const isAtomicRequest = this.configService.get('ATOMIC_REQUESTS');
		const connection = this.mongooseService.getConnection();
		// TODO: assert connection is available
		if (connection && isAtomicRequest) {
			this.logger.info('Starting Mongoose session');
			this.sessionPromise = connection.startSession();
			this.session = await this.sessionPromise;
			this.logger.info('Mongoose session is ready to use');
			this.session.startTransaction();
			this.logger.info('Mongoose session just started transaction');
		}
	}

	public getSession() {
		return this.session;
	}

	public getSessionPromise() {
		return this.sessionPromise;
	}

}
