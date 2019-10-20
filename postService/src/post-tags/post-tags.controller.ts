import mongoose from 'mongoose';
import { Controller, Get, Post, Param,
	       UsePipes, Body, Delete, UseInterceptors, Put }                from '@nestjs/common';
import { DTOBodyValidadtionPipe, MongooseObjectIdParamValidationPipe } from '../posts/posts.pipes';
import { CloseMongooseSessionInterceptor }      from '../posts/posts.interceptor';
import { IPostTagsService }                     from './post-tags.interface';
import { CreatePostTagsDTO, UpdatePostTagsDTO } from './post-tags.dto';
import { IPostService }                         from '../posts/posts.interface';

@Controller('post-tags')
@UseInterceptors(CloseMongooseSessionInterceptor)
export class PostTagsController {

	public constructor(private readonly postTagsService: IPostTagsService,
										 private readonly postService: IPostService) {}

	@Post()
	@UsePipes(new DTOBodyValidadtionPipe())
	public async createPostTags(@Body() createPostTagsDTO: CreatePostTagsDTO) {
		// TODO: add validation that post does not yet have any tags
		const { post, tags } = createPostTagsDTO;
		await this.postTagsService.createPostTags(createPostTagsDTO);
		return this.postService.updatePostTags(new mongoose.Types.ObjectId(post), tags);
	}

	@Put()
	@UsePipes(new DTOBodyValidadtionPipe())
	public async updatePostTags(@Body() updatePostTagsDTO: UpdatePostTagsDTO) {
		const { post, tags } = updatePostTagsDTO;
		await this.postService.updatePostTags(new mongoose.Types.ObjectId(post), tags);
		return this.postTagsService.updatePostTags(updatePostTagsDTO);
	}

	@Get(':postTagId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public getPostTagById(@Param('postTagId') postTagId: mongoose.Types.ObjectId) {
		return this.postTagsService.getPostTagById(postTagId);
	}

	@Delete(':postTagId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public async deletePostTagById(@Param('postTagId') postTagId: mongoose.Types.ObjectId) {
		const postTag = await this.postTagsService.getPostTagById(postTagId);
		const post    = await this.postService.getPostById(new mongoose.Types.ObjectId(postTag.post.toString()));
		const [ updatedPost, _ ] = await Promise.all([
			this.postService.updatePostTags(post._id, post.tags!.filter(tagName => tagName !== postTag.name)),
			this.postTagsService.deletePostTagById(postTagId),
		])
		return updatedPost;
	}

	@Get('by-post/:postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public getPostTagsByPostId(@Param('postId') postId: mongoose.Types.ObjectId) {
		return this.postTagsService.getPostTagsByPostId(postId);
	}

	@Delete('by-post/:postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public async deletePostTagsByPostId(@Param('postId') postId: mongoose.Types.ObjectId) {
		await this.postService.removePostTags(postId);
		return this.postTagsService.deleteAllPostTagsByPostId(postId);
	}

}
