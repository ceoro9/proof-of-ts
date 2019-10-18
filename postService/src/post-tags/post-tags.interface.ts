import { Types }                               from 'mongoose';
import { InstanceType }                        from 'typegoose';
import { PostTagModel }                        from './post-tags.model';
import { CreatePostTagDTO, UpdatePostTagsDTO } from './post-tags.dto';

export type PostTagModelInstance     = InstanceType<PostTagModel>;
export type PromisedPostTagInstance  = Promise<PostTagModelInstance>;
export type PromisedPostTagInstances = Promise<PostTagModelInstance[]>;

export interface IPostTagsService {

	getPostTagById(postTagId: Types.ObjectId): PromisedPostTagInstance;

	getPostTagsByPostId(postId: Types.ObjectId): PromisedPostTagInstances;
	
	createPostTags(createPostTagDTO: CreatePostTagDTO): PromisedPostTagInstances;

	updatePostTags(updatePostTagsDTO: UpdatePostTagsDTO): PromisedPostTagInstances;

	deletePostTagById(postTagId: Types.ObjectId): null;

	deleteAllPostTags(postId: Types.ObjectId): null;

}
