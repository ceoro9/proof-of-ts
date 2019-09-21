import ExpressConfig from './Express';
import MongoAccess from '@app/data-layer/adapters/MongoAccess';

export default class Application {

	public static port = process.env.PORT || 8000;

	public server:      any;
	public express:     ExpressConfig;
	public mongoAccess: MongoAccess;

	public constructor() {
		this.express     = new ExpressConfig();
		this.mongoAccess = new MongoAccess();
		this.express.app.listen(Application.port, () => {
			console.log(`Server has started! Check out: http://localhost:${Application.port}`);
		});
	}

}
