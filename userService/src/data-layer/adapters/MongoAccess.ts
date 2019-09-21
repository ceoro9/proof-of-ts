import mongoose from 'mongoose';
import { getEnvVar } from '@app/middleware/config/Utils';

interface MongoConnectionConfig {
	dbURL?:  string;
	dbName?: string;
}

export default class MongoAccess {

	private static mongooseInstance:   any;
	private static mongooseConnection: mongoose.Connection;

	public constructor(config: MongoConnectionConfig = {}) {
		MongoAccess.connect(config);
	}

	private static connect(config: MongoConnectionConfig): mongoose.Connection {

		if (this.mongooseInstance) {
			return this.mongooseInstance;
		}

		this.mongooseConnection = mongoose.connection;

		this.mongooseInstance.on('open', () => {

		});

		this.mongooseConnection.on('connected', () => {

		});

		this.mongooseConnection.on('error', () => {

		});

		this.mongooseConnection.on('disconnected', () => {

		});

		this.mongooseConnection.on('reconnected', () => {

		});

		process.on('SIGINT', () => {

		});

		const {
			dbURL  = getEnvVar('DATABASE_URL'),
			dbName = getEnvVar('DATABASE_NAME'),
		} = config;

		this.mongooseInstance = mongoose.connect(dbURL + dbName, { useNewUrlParser: true });

		return this.mongooseInstance;
	}

}
