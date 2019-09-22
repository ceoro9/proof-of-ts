import { Controller, Req, Res, Get } from 'routing-controllers';
import { logger } from '@app/middleware/common/Logging';

@Controller('/hello-world')
export class HelloWorld {

	public constructor() { }

	@Get('/')
	public async get(@Req() _request: Request, @Res() _response: Response) {
		logger.info('Hello world request');

		return { message: `Hello, World! ${process.env.DATABASE_URL}` };
	}

}
