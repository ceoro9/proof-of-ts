import { InstanceType }                         from 'typegoose';
import { PostTagModel }                         from './post-tags.model';
import { CreatePostTagsDTO, UpdatePostTagsDTO } from './post-tags.dto';
import { IResourceId }                          from '../base/data-types/resource-id';


export type PostTagModelInstance     = InstanceType<PostTagModel>;
export type PromisedPostTagInstance  = Promise<PostTagModelInstance>;
export type PromisedPostTagInstances = Promise<PostTagModelInstance[]>;


export interface IPostTagsService {

	getPostTagById(postTagId: IResourceId): PromisedPostTagInstance;

	getPostTagsByPostId(postId: IResourceId): PromisedPostTagInstances;
	
	createPostTags(createPostTagDTO: CreatePostTagsDTO): PromisedPostTagInstances;

	updatePostTags(updatePostTagsDTO: UpdatePostTagsDTO): PromisedPostTagInstances;

	deletePostTagById(postTagId: IResourceId): PromisedPostTagInstance;

	/**
	 * Delete all tags associated with provided post
	 * @param postId
	 * @returns number of deleted post tags
	 */
	deleteAllPostTagsByPostId(postId: IResourceId): Promise<number>;

}


export abstract class IPostTagsService implements IPostTagsService {}
