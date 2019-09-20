import ExpressConfig from './Express';
import { connectDb } from './Database';

export default class Application {

	public static port = process.env.PORT || 8000;

	public server:  any;
	public express: ExpressConfig;

	public constructor() {
		this.express = new ExpressConfig();
		new Promise(async () => {
      await connectDb();
      console.log('Successfully connected to database.');
      this.express.app.listen(Application.port, () => {
        console.log(`Server has started! Check out: http://localhost:${Application.port}`);
      });
		});
	}

}
