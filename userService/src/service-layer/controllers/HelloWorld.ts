import { Controller, Req, Res, Get } from 'routing-controllers';

@Controller('/hello-world')
export class HelloWorld {

	public constructor() { }

	@Get('/')
	public async get(@Req() _request: Request, @Res() _response: Response) {
		return { message: `Hello, World! ${process.env.DATABASE_URL}` };
	}

}
