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

		this.setUpExpressServer();
	}

	private setUpExpressServer() {
	  const controllersPath = path.resolve('dist', 'service-layer', 'controllers');
	  const middlewaresPath = path.resolve('dist', 'middleware', 'custom-middleware');
		useExpressServer(this.app, {
			defaultErrorHandler: false, // disable default error handler
			controllers: [controllersPath + '/*.js'],
			middlewares: [middlewaresPath + '/*.js'],
		});
	}

}
