import { Controller, Get, Post, Param,
	       UsePipes, Body, Delete, UseInterceptors, Put } from '@nestjs/common';
import { DTOBodyValidadtionPipe }                       from '@post-service/posts/posts.pipes';
import { CloseMongooseSessionInterceptor }              from '@post-service/posts/posts.interceptor';
import { IPostTagsService }                             from './post-tags.interface';
import { CreatePostTagsDTO, UpdatePostTagsDTO }         from './post-tags.dto';
import { IPostService }                                 from '@post-service/posts/posts.interface';
import { MongooseObjectIdParamValidationPipe }          from '@post-service/mongoose/mongoose.pipes';
import { IResourceId }                                  from '@post-service/base/data-types/resource-id';


const postTagId = 'postTagId'; 
const postId    = 'postId';


@Controller('post-tags')
@UseInterceptors(CloseMongooseSessionInterceptor)
export class PostTagsController {

	public constructor(private readonly postTagsService: IPostTagsService,
										 private readonly postService: IPostService) {}

	@Post()
	@UsePipes(new DTOBodyValidadtionPipe())
	public async createPostTags(@Body() createPostTagsDTO: CreatePostTagsDTO) {
		// TODO: add validation that post does not yet have any tags
		const { postId, tags } = createPostTagsDTO;
		await this.postTagsService.createPostTags(createPostTagsDTO);
		return this.postService.updatePostTags(postId, tags);
	}

	@Put()
	@UsePipes(new DTOBodyValidadtionPipe())
	public async updatePostTags(@Body() updatePostTagsDTO: UpdatePostTagsDTO) {
		const { postId, tags } = updatePostTagsDTO;
		await this.postService.updatePostTags(postId, tags);
		return this.postTagsService.updatePostTags(updatePostTagsDTO);
	}

	@Get(`:${postTagId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postTagId))
	public getPostTagById(@Param(postTagId) postTagId: IResourceId) {
		return this.postTagsService.getPostTagById(postTagId);
	}

	@Delete(`:${postTagId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postTagId))
	public async deletePostTagById(@Param(postTagId) postTagId: IResourceId) {
		const postTag = await this.postTagsService.getPostTagById(postTagId);
		const post    = await this.postService.getPostById(postTag.post);
		const [ updatedPost, _ ] = await Promise.all([
			this.postService.updatePostTags(post._id, post.tags!.filter(tagName => tagName !== postTag.name)),
			this.postTagsService.deletePostTagById(postTagId),
		]);
		return updatedPost;
	}

	@Get(`by-post/:${postId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postId))
	public getPostTagsByPostId(@Param(postId) postId: IResourceId) {
		return this.postTagsService.getPostTagsByPostId(postId);
	}

	@Delete(`by-post/:${postId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postId))
	public async deletePostTagsByPostId(@Param(postId) postId: IResourceId) {
		await this.postService.removePostTags(postId);
		return this.postTagsService.deleteAllPostTagsByPostId(postId);
	}

}
