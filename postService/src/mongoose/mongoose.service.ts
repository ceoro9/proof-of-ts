
import mongoose from 'mongoose';
import { 
	Injectable,
	OnApplicationShutdown,
	OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { ILogger } from '../logger';

@Injectable()
export class MongooseService implements OnApplicationBootstrap, OnApplicationShutdown {

	private RECONNECT_INTERVAL = 5000; // in ms

	public mongooseInstance?: typeof mongoose;
	public connection?: mongoose.Connection;

	public constructor(private logger: ILogger, private configService: ConfigService) {}

	/**
	 * Set up mongoose connection and resolve
	 * promise once connection is ready to be used
	 */
	public async onApplicationBootstrap() {

		const dbURL  = this.configService.getStrict('MONGO_URL');
		const dbName = this.configService.getStrict('MONGO_POSTS_DB_NAME');

		const setUpMongooseInstance = () => mongoose.connect(dbURL + dbName, { useNewUrlParser: true });

		return new Promise(async (resolve, reject) => {

			this.connection = mongoose.connection;

			this.connection.on('open', () => {
				this.logger.info('Connection to MongoDB is opened.');
			});

			this.connection.on('connected', () => {
				this.logger.info('Mongoose default connection is connected.');
				resolve();
			});

			this.connection.on('error', msg => {
				this.logger.error(`Mongoose default connection error: ${msg}`);
				reject(new Error(msg));
			});

			this.connection.on('disconnected', () => {
				this.logger.info('Mongoose default connection is disconnected.');
				setTimeout(async () => {
					this.mongooseInstance = await setUpMongooseInstance();
				}, this.RECONNECT_INTERVAL);
			});

			this.connection.on('reconnected', () => {
				this.logger.info('Mongoose default connection is reconnected.');
			});

			this.logger.info('Connecting to MongoDB');
			this.mongooseInstance = await setUpMongooseInstance();
		});
	}

	/**
	 * Close mongoose connection
	 */
	public async onApplicationShutdown() {
		if (this.connection) {
			await this.connection.close();
		}
	}

	public getConnection() {
		return this.connection;
	}

	public getMongooseInstance() {
		return this.mongooseInstance;
	}

}
