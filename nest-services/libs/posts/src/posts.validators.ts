import mongoose        from 'mongoose';
import { Injectable }  from '@nestjs/common';
import { UserService } from '@post-service/users/users.service';
import {
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
} from 'class-validator';
import { MongooseResourceIdField } from '@post-service/mongoose/mongoose.validation';
import { PostModel }               from './post.model';
import { IResourceId } from '@post-service/base/data-types/resource-id';


@ValidatorConstraint({ async: false })
export class MongooseObjectId implements ValidatorConstraintInterface {

	public validate(objectId: string, _args: ValidationArguments) {
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

export function PostIdResourceField() {

	return MongooseResourceIdField({
			
		findById(resourceId: IResourceId) {			
			return PostModel.findById(resourceId).exec();
		},
		
		getResourceName() {
			return PostModel.name;
		},

	});
}
