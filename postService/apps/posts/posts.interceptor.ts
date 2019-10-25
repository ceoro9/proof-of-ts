import { Observable }             from 'rxjs';
import { catchError, map }        from 'rxjs/operators';
import { MongooseSessionService } from '../mongoose/session.service';
import { ILogger }                from '../libs/logger/src/logger.interface';
import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';

@Injectable()
export class CloseMongooseSessionInterceptor implements NestInterceptor {

	public constructor(private readonly logger: ILogger,
									   private readonly mongooseSessionService: MongooseSessionService) {}
	
	public async intercept(_context: ExecutionContext, next: CallHandler) {
		return next.handle().pipe(
			// Success -> commit session
			map((result: Observable<any>) => {
				const session = this.mongooseSessionService.getSession();
				if (session) {
					this.logger.info('Committing transaction');
					session.commitTransaction();
				}
				return result;
			},
			// Failure -> abort session
			catchError((err: any, _caugth: Observable<any>) => {
				const session = this.mongooseSessionService.getSession();
				if (session) {
					this.logger.info('Aborting transaction');
					session.abortTransaction();
				}
				throw err;
			}))
		);
	}

}
