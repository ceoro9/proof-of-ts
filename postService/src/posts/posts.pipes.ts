import mongoose from 'mongoose';
import {
	PipeTransform,
	ArgumentMetadata,
	Injectable,
	BadRequestException,
} from '@nestjs/common';
import { BaseDTO } from './create-post.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

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

export class DTOValidadtionPipe implements PipeTransform {
	
	public async transform(value: any, { metatype }: ArgumentMetadata) {

		console.log(value, 'sssss');

		if (!metatype || !this.toValidate(value)) {
			return value;
		}

		console.log('ooo');
		
		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		// TODO: prettiy error-response
		if (errors.length) {
			throw new BadRequestException('Validation faied');
		}

		return object;
	}

	private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

}
