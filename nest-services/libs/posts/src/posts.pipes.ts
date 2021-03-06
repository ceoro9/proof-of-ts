import mongoose from 'mongoose';
import {
	PipeTransform,
	ArgumentMetadata,
	Injectable,
	BadRequestException,
} from '@nestjs/common';
import { validate }          from 'class-validator';
import { plainToClass }      from 'class-transformer';
import { BaseModelDTO }      from '@post-service/base/base.dto';

/**
 * Checks if B is sub-class of A
 */
function isSubClass(B: any) {
	return (A: any) => B.prototype instanceof A || B === A;
}

/**
 * This pipe transforms string object id from request params into
 * mongoose.Types.ObjectId and throws BadRequestException
 * if string object id has invalid format.
 */
@Injectable()
export class MongooseObjectIdParamValidationPipe implements PipeTransform<string, mongoose.Types.ObjectId> {

	public transform(objectId: any, { metatype, type }: ArgumentMetadata) {

		if (type === 'param' && metatype && isSubClass(metatype)(mongoose.Types.ObjectId)) {

			if (!mongoose.Types.ObjectId.isValid(objectId)) {
				throw new BadRequestException('Validation failed. Invalid id format');
			}
			
			return mongoose.Types.ObjectId(objectId);;
		}

		return objectId;
	}

}

/**
 * This pipe transforms arbitrary object from request body into
 * DTO class instance and makes its validation. In case validation
 * has failed, it throws ValidationException. To make transformation
 * work your dto class should be sub-class of BaseDTO class.
 */
export class DTOBodyValidadtionPipe implements PipeTransform {
	
	public async transform(value: any, { metatype, type }: ArgumentMetadata) {

		console.log(metatype, 'ssssss');

		if (type === 'body' && metatype && isSubClass(metatype)(BaseModelDTO)) {
			
			const object = plainToClass(metatype, value);
			const errors = await validate(object);

			console.log(errors);
		
			// TODO: prettiy error-response
			if (errors.length) {
				throw new BadRequestException('Validation faied');
			}

			return object;
		}

		return value;
	}

}
