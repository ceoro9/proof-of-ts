import mongoose from 'mongoose';
import { Typegoose, ModelType } from 'typegoose';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IPostService }  from './posts.interface';
import { PostModel }     from './models/post.model';
import { UserService }   from '../users/users.service';
import { UpdatePostDTO } from './update-post.dto';
import { CreatePostDTO } from './create-post.dto';

export abstract class BaseService<T extends Typegoose> {

	protected abstract model: ModelType<T>;

	public create(props: any) {
		return this.model.create(props);
	}

	public find(filters: any) {
		return this.model.find(filters);
	}

	public async findById(id: mongoose.Types.ObjectId) {
		const document = await this.model.findById(id).exec();
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public async findOneAndUpdate(filter: Partial<T>, props: any) {
		const options = { new: true, context: 'query', runValidators: true } as const;
		const document = await this.model.findOneAndUpdate(filter, props, options);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public async findOneAndReplace(filter: Partial<T>, props: any) {
		const options = { new: true, overwrite: true, context: 'query', runValidators: true } as const;
		const document = await this.model.findOneAndUpdate(filter, props, options);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public async findOneAndDelete(filter: any) {
		const document = await this.model.findOneAndDelete(filter);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	private getNotFoundException() {
		return new NotFoundException(`${this.model.name} not found.`)
	}

}

@Injectable()
export class PostService extends BaseService<PostModel> implements IPostService {

	public constructor(@Inject(PostModel) protected model: ModelType<PostModel>, private userService: UserService) {
		super();
	}

	public createPost(postData: CreatePostDTO) {
		return this.create(postData);
	}

	public getPostById(postId: mongoose.Types.ObjectId) {
		return this.findById(postId);
	}

	public updatePostById(postId: mongoose.Types.ObjectId, newData: UpdatePostDTO) {
		return this.findOneAndUpdate({ _id: postId }, newData);
	}

	public deletePostById(postId: mongoose.Types.ObjectId) {
		return this.findOneAndDelete({ _id: postId });
	}

	public async getUserPostsByUserId(userId: mongoose.Types.ObjectId) {
		await this.userService.getUserById(userId.toHexString());
		return this.find({ userId });
	}

}
