import mongoose from 'mongoose';
import { validate as validateSchema, Length, Validate  } from 'class-validator';
import { MongooseObjectId, DoesUserWithProvidedIdExist } from './posts.validators';

export class BaseDTO {

	protected isValid: boolean | undefined;

	public async validate() {
		const validationErrors = await validateSchema(this);
		this.isValid = validationErrors.length === 0;
		return validationErrors;
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
