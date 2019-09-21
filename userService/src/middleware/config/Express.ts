import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { useExpressServer } from 'routing-controllers';

export default class ExpressConfig {

	public app: express.Express;

	public constructor() {
		this.app = express();

		// middleware
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.setUpControllers();
	}

	private setUpControllers() {
		const controllersPath = path.resolve('dist', 'service-layer', 'controllers');
		useExpressServer(this.app, {
			controllers: [controllersPath + '/*.js'],
		});
	}

}
