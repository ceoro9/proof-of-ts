import ExpressConfig from './Express';
import { Container } from 'typedi';
import { useContainer } from 'routing-controllers';
import MongoAccess  from '@app/data-layer/adapters/MongoAccess';
import RabbitAccess from '@app/data-layer/adapters/RabbitAccess';
import { logger } from '@app/middleware/common/Logging';
import { getEnvVar } from '@app/utils/Configuration';

enum ApplicationEnvironment {
	DEVELOPMENT = 'development', // default one
	PRODUCTION  = 'production',
}

export default class Application {

	private static port = +getEnvVar('PORT', '8000');
	private static env  =  getEnvVar('NODE_ENV', ApplicationEnvironment.DEVELOPMENT);

	public server:       any;
	public express:      ExpressConfig;
	public mongoAccess:  MongoAccess;
	public rabbitAccess: RabbitAccess;

	public constructor() {
		useContainer(Container);
		this.express      = new ExpressConfig();
		this.mongoAccess  = new MongoAccess();
		this.rabbitAccess = new RabbitAccess();
		this.startServer();
	}

	public async startServer() {
		// wait for data adapters to set up
		await Promise.all(this.getDataAdapters());
		this.express.app.listen(Application.port, () => {
			logger.info(`Server has started!`);
		});
	}

	private getDataAdapters() {
		return [
			this.mongoAccess,
			this.rabbitAccess,
		]
	}

	public static isDevelopmentEnv() {
		return this.env === ApplicationEnvironment.DEVELOPMENT;
	}

	public static isProductionEnv() {
		return this.env === ApplicationEnvironment.PRODUCTION;
	}

}
