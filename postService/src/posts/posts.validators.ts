import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';
import { UserService } from '../users/users.service';

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
