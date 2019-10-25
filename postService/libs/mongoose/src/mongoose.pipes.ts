import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ResourceIdParamValidationPipe } from '../base/base.pipes';

/**
 * This pipe transforms string object id from request param,
 * which name was specified in constructor, into
 * mongoose.Types.ObjectId and throws BadRequestException
 * if string object id has invalid format.
 */
@Injectable()
export class MongooseObjectIdParamValidationPipe extends ResourceIdParamValidationPipe {

	public createResourceIdInstance(resourceIdValue: string) {
		return new mongoose.Types.ObjectId(resourceIdValue);
	}

	public isValidFormat(resourceIdValue: string) {
		return mongoose.Types.ObjectId.isValid(resourceIdValue);
	}

}
