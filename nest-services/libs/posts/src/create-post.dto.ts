import { Length, Validate  } from 'class-validator';
import { MongooseModelDTO }  from '@post-service/mongoose/mongoose.dto';
import {
	MongooseObjectId,
	DoesUserWithProvidedIdExist,
} from './posts.validators';


export class CreatePostDTO extends MongooseModelDTO {

	@Validate(MongooseObjectId)
	@Validate(DoesUserWithProvidedIdExist)
	readonly userId?: string;
	
	@Length(5, 100)
	readonly title?: string;
	
	@Length(5, 5000)
	readonly text?: string;

}
