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
export class PostsController {

	public constructor(private readonly postTagsService: IPostTagsService,
										 private readonly postService: IPostService) {}

	@Post()
	@UsePipes(new DTOBodyValidadtionPipe())
	public createPostTags(@Body() createPostTagsDTO: CreatePostTagsDTO) {
		return this.postTagsService.createPostTags(createPostTagsDTO);
	}

	@Put()
	@UsePipes(new DTOBodyValidadtionPipe())
	public updatePostTags(@Body() updatePostTagsDTO: UpdatePostTagsDTO) {
		return this.postTagsService.updatePostTags(updatePostTagsDTO);
	}

	@Get(':postTagId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public getPostTagById(@Param('postTagId') postTagId: mongoose.Types.ObjectId) {
		return this.postTagsService.getPostTagById(postTagId);
	}

	@Delete(':postTagId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public deletePostTagById(@Param('postTagId') postTagId: mongoose.Types.ObjectId) {
		return this.postTagsService.deletePostTagById(postTagId);
	}

	@Get('by-post/:postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public getPostTagsByPostId(@Param('postId') postId: mongoose.Types.ObjectId) {
		return this.postTagsService.getPostTagsByPostId(postId);
	}

	@Delete('by-post/:postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public deletePostTagsByPostId(@Param('postId') postId: mongoose.Types.ObjectId) {
		return this.postTagsService.deleteAllPostTagsByPostId(postId);
	}



	// @Post()
	// @UsePipes(new DTOBodyValidadtionPipe())
	// public createUserPost(@Body() createPostDTO: CreatePostDTO) {
	// 	return this.postService.createPost(createPostDTO);
	// }

}