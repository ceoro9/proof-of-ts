import { InstanceType }  from 'typegoose';
import { PostModel }     from './post.model';
import { CreatePostDTO } from './create-post.dto';
import { UpdatePostDTO } from './update-post.dto';
import { IResourceId }   from '../base/data-types/resource-id';

// PostService
// ====================================================================================

export type PostModelInstance     = InstanceType<PostModel>;
export type PromisedPostInstance  = Promise<PostModelInstance>;
export type PromisedPostInstances = Promise<PostModelInstance[]>;

export interface IPostService {

	createPost(postData: CreatePostDTO): PromisedPostInstance;
	
	getPostById(postId: IResourceId): PromisedPostInstance;
	
	updatePostById(postId: IResourceId, newData: UpdatePostDTO): PromisedPostInstance;
	
	deletePostById(postId: IResourceId): PromisedPostInstance;
	
	getUserPostsByUserId(userId: IResourceId): PromisedPostInstances;

	updatePostTags(postId: IResourceId, tags: Array<string>): PromisedPostInstance;

	removePostTags(postId: IResourceId): PromisedPostInstance;

}

export abstract class IPostService implements IPostService {}

// PostServiceSafe
// ====================================================================================

export type PostModelInstanceSafe     = PostModelInstance | null;
export type PromisedPostInstanceSafe  = Promise<PostModelInstanceSafe>;  

type ArgumentTypes<T> = T extends (... args: infer U ) => infer _ ? U: never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

type NullablePromisedPostInstanceReturnType<T> =
	T extends (... args: any ) => infer R
	? ReplaceReturnType<T, R extends PromisedPostInstance
		? PromisedPostInstanceSafe
		: R >
	: T;

export type IPostSafeService = {
	[K in keyof IPostService]: NullablePromisedPostInstanceReturnType<IPostService[K]>;
}

export interface IPostServiceSafe extends IPostSafeService {}

export abstract class IPostServiceSafe implements IPostServiceSafe {}
