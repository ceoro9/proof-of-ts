import { CreatePostDTO }    from '../posts/create-post.dto';
import { MongooseObjectId } from '../posts/posts.validators';
import { MongooseModelDTO } from '../mongoose/mongoose.dto';
import {
	Validate,
	Length,
	ArrayUnique,
	ArrayMaxSize,
	ArrayMinSize,
	IsDefined,
} from "class-validator";

const MIN_POST_TAGS = 0;
const MAX_POST_TAGS = 10;

export class CreatePostTagDTO extends MongooseModelDTO {
	
	@IsDefined()
	@Validate(MongooseObjectId)
	readonly post!: string;

	@IsDefined()
	@Length(2, 100)
	readonly name!: string;

}

export class CreatePostTagsDTO extends MongooseModelDTO {

	@IsDefined()
	@Validate(MongooseObjectId)
	readonly post!: string;

	@IsDefined()
	@ArrayUnique()
	@ArrayMinSize(MIN_POST_TAGS)
	@ArrayMaxSize(MAX_POST_TAGS)
	readonly tags!: Array<string>;

}

export class UpdatePostTagDTO extends CreatePostDTO {}

export class UpdatePostTagsDTO extends CreatePostTagsDTO {}
