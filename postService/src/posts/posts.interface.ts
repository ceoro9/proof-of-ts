import { Types }        from 'mongoose';
import { InstanceType } from 'typegoose';
import { Post }         from './models/post.model';

type PromisedPostInstance = Promise<InstanceType<Post>>;

export interface IPostService {
	createPost  (postData: any): PromisedPostInstance;
	getPostById (postId: Types.ObjectId): PromisedPostInstance;
	// updatePostById?(postId: Types.ObjectId): Post;
	// deletePostById?(postId: Types.ObjectId): Post;
	// getUserPostsByUserId?(userId: Types.ObjectId): Post[];
}

export abstract class IPostService implements IPostService {}
