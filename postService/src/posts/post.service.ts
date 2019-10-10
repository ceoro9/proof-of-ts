import mongoose from 'mongoose';
import { Typegoose, ModelType } from 'typegoose';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IPostService } from './posts.interface';
import { PostModel } from './models/post.model';

export abstract class BaseService<T extends Typegoose> {

	protected abstract model: ModelType<T>;

	public create(props: T) {
		return this.model.create(props);
	}

	public find(filters: Partial<T>) {
		return this.model.find(filters);
	}

	public async findById(id: mongoose.Types.ObjectId) {
		const document = await this.model.findById(id).exec();
		if (!document) {
			throw new NotFoundException(`${this.model.name} not found.`);
		}
		return document;
	}

}

@Injectable()
export class PostService extends BaseService<PostModel> implements IPostService {

	public constructor(@Inject(PostModel) protected model: ModelType<PostModel>) {
		super();
	}

	public createPost(postData: any) {
		return this.create(postData);
	}

	public getPostById(postId: mongoose.Types.ObjectId) {
		return this.findById(postId);
	}

	public updatePostById(postId: mongoose.Types.ObjectId) {

	}

	public deletePostById(postId: mongoose.Types.ObjectId) {

	}

	public getUserPostsByUserId(userId: mongoose.Types.ObjectId) {

	}

}
