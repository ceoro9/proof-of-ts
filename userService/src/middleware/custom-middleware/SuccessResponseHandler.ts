import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

/**
 * Express middleware to have unified response
 * format for successfull requests.
 */
@Middleware({ type: 'before' })
export default class SuccessResponseHandle implements ExpressMiddlewareInterface {
	
	use(_request: any, response: any, next: (err?: any) => any): any {

		const defaultSend = response.send;

		response.send = function(body: Buffer | string) {
			try {
				const parsedBody = JSON.parse(body instanceof Buffer ? body.toString() : body);

				// does not change when error response
				if (parsedBody.error) {
					throw new Error();
				}

				const newBody = JSON.stringify({ data: parsedBody });
				defaultSend.call(this, newBody);
			} catch (_e) {
				defaultSend.call(this, body);
			}		
		}
		

		next();
	}

}
