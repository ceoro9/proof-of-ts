import { Types }                                from 'mongoose';
import { InstanceType }                         from 'typegoose';
import { PostTagModel }                         from './post-tags.model';
import { CreatePostTagsDTO, UpdatePostTagsDTO } from './post-tags.dto';

export type PostTagModelInstance     = InstanceType<PostTagModel>;
export type PromisedPostTagInstance  = Promise<PostTagModelInstance>;
export type PromisedPostTagInstances = Promise<PostTagModelInstance[]>;

export interface IPostTagsService {

	getPostTagById(postTagId: Types.ObjectId): PromisedPostTagInstance;

	getPostTagsByPostId(postId: Types.ObjectId): PromisedPostTagInstances;
	
	createPostTags(createPostTagDTO: CreatePostTagsDTO): PromisedPostTagInstances;

	updatePostTags(updatePostTagsDTO: UpdatePostTagsDTO): PromisedPostTagInstances;

	deletePostTagById(postTagId: Types.ObjectId): PromisedPostTagInstance;

	/**
	 * Delete all tags associated with provided post
	 * @param postId
	 * @returns number of deleted post tags
	 */
	deleteAllPostTagsByPostId(postId: Types.ObjectId): Promise<number>;

}
