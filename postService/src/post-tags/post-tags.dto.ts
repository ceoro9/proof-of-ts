import { CreatePostDTO }       from '../posts/create-post.dto';
import { MongooseModelDTO }    from '../mongoose/mongoose.dto';
import { IResourceId }         from '../base/data-types/resource-id';
import { Type }                from 'class-transformer';
import { PostIdResourceField } from '../posts/posts.validators';
import {
	Length,
	ArrayUnique,
	ArrayMaxSize,
	ArrayMinSize,
	IsString,
	IsDefined,
} from "class-validator";


const MIN_POST_TAGS = 0;
const MAX_POST_TAGS = 10;


export class CreatePostTagDTO extends MongooseModelDTO {
	
	@PostIdResourceField()
	readonly postId!: IResourceId;

	@IsDefined()
	@IsString()
	@Length(2, 100)
	readonly name!: string;

}

export class CreatePostTagsDTO extends MongooseModelDTO {

	@PostIdResourceField()
	readonly postId!: IResourceId;

	@IsDefined()
	@IsString({ each: true })
	@ArrayUnique()
	@ArrayMinSize(MIN_POST_TAGS)
	@ArrayMaxSize(MAX_POST_TAGS)
	readonly tags!: Array<string>;

}

export class UpdatePostTagDTO extends CreatePostDTO {}

export class UpdatePostTagsDTO extends CreatePostTagsDTO {}
