import { ModelType }                            from 'typegoose';
import { Injectable, Inject }                   from '@nestjs/common';
import { plainToClass }                         from 'class-transformer';

import { PostTagModel }                         from './post-tags.model';
import { IPostTagsService }                     from './post-tags.interface';
import { CreatePostTagsDTO, UpdatePostTagsDTO } from './post-tags.dto';

import { MongooseSessionService }               from '@post-service/mongoose/session.service';
import { BaseModelService }                     from '@post-service/base/base.service';
import { IResourceId }                          from '@post-service/base/data-types/resource-id';


@Injectable()
export class PostTagsService extends BaseModelService<PostTagModel> implements IPostTagsService {

	public constructor(@Inject(PostTagModel) model: ModelType<PostTagModel>,
										 private readonly mongooseSessionService: MongooseSessionService) {
		super(model);
	}

	public getPostTagById(postTagId: IResourceId) {
		return this.findById(postTagId);
	}

	public getPostTagsByPostId(post: IResourceId) {
		return this.find({ post }).exec();
	}

	public createPostTags(createPostsTagsDTO: CreatePostTagsDTO) {
		return this.createMany(createPostsTagsDTO.tags.map(tagName => ({
			post: createPostsTagsDTO.postId,
			name: tagName,
		})));
	}

	public async updatePostTags(updatePostTagsDTO: UpdatePostTagsDTO) {
		const { postId, tags } = updatePostTagsDTO;
		const createPostDTO = plainToClass(CreatePostTagsDTO, { postId, tags });
		const [ _, createdPostTags ] = await Promise.all([
			this.deleteAllPostTagsByPostId(postId),
			this.createPostTags(createPostDTO),
		]);
		return createdPostTags;
	}

	public deletePostTagById(postTagId: IResourceId) {
		return this.findOneAndDelete({ _id: postTagId });
	}

	public async deleteAllPostTagsByPostId(post: IResourceId) {
		const { deletedCount } = await this.findManyAndDelete({ post }).exec();
		return deletedCount ? deletedCount : 0;
	}

	public getSession() {
		const session = this.mongooseSessionService.getSession();
		return session ? session : null;
	}

}
