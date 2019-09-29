import mongoose from 'mongoose';
import { getEnvVar } from '@app/utils/Configuration';
import { logger } from '@app/middleware/common/Logging';

interface MongoConnectionConfig {
	dbURL:  string;
	dbName: string;
}

export default class MongoAccess {

	public static RECONNECT_INTERVAL = 5000; // in ms

	private static mongooseInstance:   any;
	private static mongooseConnection: mongoose.Connection;

	private static envConfig: MongoConnectionConfig = {
		dbURL:  getEnvVar('DATABASE_URL'),
		dbName: getEnvVar('DATABASE_NAME'),
	}

	public constructor(config: MongoConnectionConfig = MongoAccess.envConfig) {
		MongoAccess.connect(config);
	}

	private static connect(config: MongoConnectionConfig): mongoose.Connection {

		if (this.mongooseInstance) {
			return this.mongooseInstance;
		}

		const { dbURL, dbName } = config;
		const setUpMongooseInstance = () => mongoose.connect(dbURL + dbName, { useNewUrlParser: true });

		this.mongooseConnection = mongoose.connection;

		this.mongooseConnection.on('open', () => {
			logger.info('Connection to MongoDB is opened.');
		});

		this.mongooseConnection.on('connected', () => {
			logger.info('Mongoose default connection is connected.');
		});

		this.mongooseConnection.on('error', msg => {
			logger.error(`Mongoose default connection error: ${msg}`);
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
			await this.mongooseConnection.close();
			logger.info('Mongoose default connection is disconnected through app termiation.');
			process.exit(0);
		});

		this.mongooseInstance = setUpMongooseInstance();

		return this.mongooseInstance;
	}

}
