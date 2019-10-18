import { Types }                                from 'mongoose';
import { ModelType }                            from 'typegoose';
import { Injectable, Inject }                   from '@nestjs/common';
import { plainToClass }                         from 'class-transformer';
import { BaseService }                          from '../posts/posts.service';
import { PostTagModel }                         from './post-tags.model';
import { MongooseSessionService }               from '../mongoose/session.service';
import { IPostTagsService }                     from './post-tags.interface';
import { CreatePostTagsDTO, UpdatePostTagsDTO } from './post-tags.dto';

@Injectable()
export class PostTagsService extends BaseService<PostTagModel> implements IPostTagsService {

	public constructor(@Inject(PostTagModel) model: ModelType<PostTagModel>,
										 private readonly mongooseSessionService: MongooseSessionService) {
		super(model);
	}

	public getPostTagById(postTagId: Types.ObjectId) {
		return this.findById(postTagId);
	}

	public getPostTagsByPostId(post: Types.ObjectId) {
		return this.find({ post }).exec();
	}

	public createPostTags(createPostsTagsDTO: CreatePostTagsDTO) {
		return this.createMany(createPostsTagsDTO.tags.map(tagName => ({
			post: createPostsTagsDTO.post,
			name: tagName,
		})));
	}

	public updatePostTags(updatePostTagsDTO: UpdatePostTagsDTO) {
		const { post, tags } = updatePostTagsDTO;
		this.deleteAllPostTagsByPostId(new Types.ObjectId(post));
		const createPostDTO = plainToClass(CreatePostTagsDTO, { post, tags });
		return this.createPostTags(createPostDTO);
	}

	public deletePostTagById(postTagId: Types.ObjectId) {
		return this.findOneAndDelete({ _id: postTagId });
	}

	public async deleteAllPostTagsByPostId(post: Types.ObjectId) {
		const { deletedCount } = await this.findManyAndDelete({ post }).exec();
		return deletedCount ? deletedCount : 0;
	}

	public getSession() {
		const session = this.mongooseSessionService.getSession();
		return session ? session : null;
	}

}
