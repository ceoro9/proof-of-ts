import mongoose from 'mongoose';
import {
	PipeTransform,
	ArgumentMetadata,
	Injectable,
	BadRequestException,
} from '@nestjs/common';

/**
 * This pipe transforms string object id into
 * mongoose.Types.ObjectId and throws BadRequestException
 * if string object id has invalid format.
 */
@Injectable()
export class MongooseObjectIdValidationPipe implements PipeTransform<string, mongoose.Types.ObjectId> {

	public transform(resourceId: string, _metadata: ArgumentMetadata) {
		if (!mongoose.Types.ObjectId.isValid(resourceId)) {
			throw new BadRequestException('Validation failed. Invalid id format');
		}
		return mongoose.Types.ObjectId(resourceId);;
	}

}
