import { Types }         from 'mongoose';
import { InstanceType }  from 'typegoose';
import { PostModel }     from './models/post.model';
import { CreatePostDTO } from './create-post.dto';
import { UpdatePostDTO } from './update-post.dto';

export type PostModelInstance     = InstanceType<PostModel>;
export type PromisedPostInstance  = Promise<PostModelInstance>;
export type PromisedPostInstances = Promise<PostModelInstance[]>; 

export interface IPostService {
	
	createPost(postData: CreatePostDTO): PromisedPostInstance;
	
	getPostById(postId: Types.ObjectId): PromisedPostInstance;
	
	updatePostById(postId: Types.ObjectId, newData: UpdatePostDTO): PromisedPostInstance;
	
	deletePostById(postId: Types.ObjectId): PromisedPostInstance;
	
	getUserPostsByUserId(userId: Types.ObjectId): PromisedPostInstances;

}

export abstract class IPostService implements IPostService {}
