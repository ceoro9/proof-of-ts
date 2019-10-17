import { tap, catchError } from 'rxjs/operators';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { MongooseSessionService } from '../mongoose/session.service';
import { Observable } from 'rxjs';

@Injectable()
export class CloseMongooseSessionInterceptor implements NestInterceptor {

	public constructor(private readonly mongooseSessionService: MongooseSessionService) {}
	
	public async intercept(_context: ExecutionContext, next: CallHandler) {
		console.log('aaaaaaa');
		return next.handle().pipe(
			// Success -> commit session
			tap(() => {
				const session = this.mongooseSessionService.getSession();
				if (session) {
					session.commitTransaction();
				}
			},
			// Failure -> abort session
			catchError((err: any, _caugth: Observable<any>) => {
				const session = this.mongooseSessionService.getSession();
				if (session) {
					session.abortTransaction();
				}
				throw err;
			}))
		);
	}

}
