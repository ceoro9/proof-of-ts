import { Types }        from 'mongoose';
import { InstanceType } from 'typegoose';
import { PostModel }    from './models/post.model';

export type PostModelInstance     = InstanceType<PostModel>;
export type PromisedPostInstance  = Promise<PostModelInstance>;
export type PromisedPostInstances = Promise<PostModelInstance[]>; 

export interface IPostService {
	createPost(postData: any): PromisedPostInstance;
	getPostById(postId: Types.ObjectId): PromisedPostInstance;
	// updatePostById?(postId: Types.ObjectId): Post;
	// deletePostById?(postId: Types.ObjectId): Post;
	getUserPostsByUserId(userId: Types.ObjectId): PromisedPostInstances;
}

export abstract class IPostService implements IPostService {}
