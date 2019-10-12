import mongoose from 'mongoose';
import {
	validate as validateSchema,
	Length,
	Validate,
	ValidatorConstraintInterface,
	ValidationArguments,
	ValidatorConstraint,
} from 'class-validator';
import { UserService } from '../users/users.service';
import { Injectable }  from '@nestjs/common';

export class BaseDTO {

	protected isValid: boolean | undefined;

	public async validate() {
		const validationErrors = await validateSchema(this);
		this.isValid = validationErrors.length === 0;
		return validationErrors;
	}

}

@ValidatorConstraint({ async: false })
export class MongooseObjectId implements ValidatorConstraintInterface {

	public validate(objectId: string, args: ValidationArguments) {
		return mongoose.Types.ObjectId.isValid(objectId);
	}

	public defaultMessage(args: ValidationArguments) {
		return `Object id value '${args.value}' is invalid`;
	}

}

@Injectable()
@ValidatorConstraint({ name: 'doesUserWithProvidedIdExist', async: true })
export class DoesUserWithProvidedIdExist implements ValidatorConstraintInterface {

	public constructor(private readonly userService: UserService) {}

	public validate(userId: string, _args: ValidationArguments) {
		return this.userService.doesUserExist(userId);
	}

	public defaultMessage(args: ValidationArguments) {
		return `User with id '${args.value}' does not exist`;
	}

}

export class CreatePostDTO extends BaseDTO {

	@Validate(MongooseObjectId)
	@Validate(DoesUserWithProvidedIdExist)
	readonly userId?: string;
	
	@Length(5, 100)
	readonly title?: string;
	
	@Length(5, 5000)
	readonly text?: string;

	public get userID() {
		if (!this.isValid) {
			throw new Error('Cannot access computed property');
		}
		return new mongoose.Types.ObjectId(this.userId);
	}

}
