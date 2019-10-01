import mongoose from 'mongoose';
import { getEnvVar } from '@app/utils/Configuration';
import { logger } from '@app/middleware/common/Logging';
import { PromiseAccess } from './BaseAccess';
import { isNull } from '@app/utils/TypeGuards';

interface MongoConnectionConfig {
	dbURL:  string;
	dbName: string;
}

export default class MongoAccess extends PromiseAccess<MongoConnectionConfig> {

	public RECONNECT_INTERVAL = 5000; // in ms

	private mongooseInstance:   any                        = null;
	private mongooseConnection: mongoose.Connection | null = null;

	public getDefaultEnvConfig() {
		return {
			dbURL:  getEnvVar('DATABASE_URL'),
			dbName: getEnvVar('DATABASE_NAME'),
		}
	}

	public connect(): mongoose.Connection {

		if (this.mongooseInstance) {
			return this.mongooseInstance;
		}

		const { dbURL, dbName } = this.config;
		const setUpMongooseInstance = () => mongoose.connect(dbURL + dbName, { useNewUrlParser: true });

		this.mongooseConnection = mongoose.connection;

		this.mongooseConnection.on('open', () => {
			logger.info('Connection to MongoDB is opened.');
		});

		this.mongooseConnection.on('connected', () => {
			logger.info('Mongoose default connection is connected.');
			this.resolve(null);
		});

		this.mongooseConnection.on('error', msg => {
			logger.error(`Mongoose default connection error: ${msg}`);
			this.reject(new Error(msg));
		});

		this.mongooseConnection.on('disconnected', () => {
			logger.info('Mongoose default connection is disconnected.');
			setTimeout(() => {
				this.mongooseInstance = setUpMongooseInstance();
			}, this.RECONNECT_INTERVAL);
		});

		this.mongooseConnection.on('reconnected', () => {
			logger.info('Mongoose default connection is reconnected.');
		});

		process.on('SIGINT', async () => {
			if (!isNull(this.mongooseConnection)) {
				await this.mongooseConnection.close();
				logger.info('Mongoose default connection is disconnected through app termiation.');
			}
			process.exit(0);
		});

		logger.info('Connecting to MongoDB');
		this.mongooseInstance = setUpMongooseInstance();

		return this.mongooseInstance;
	}

}
