import mongoose from 'mongoose';
import { Controller, Get, Post, Param, UsePipes, Body, Patch, Delete, UseInterceptors } from '@nestjs/common';
import { MongooseObjectIdParamValidationPipe, DTOBodyValidadtionPipe } from './posts.pipes';
import { CloseMongooseSessionInterceptor } from './posts.interceptor';
import { IPostService }  from './posts.interface';
import { CreatePostDTO } from './create-post.dto';
import { UpdatePostDTO } from './update-post.dto';

@Controller('posts')
@UseInterceptors(CloseMongooseSessionInterceptor)
export class PostsController {

	public constructor(private postService: IPostService) {}

	@Post()
	@UsePipes(new DTOBodyValidadtionPipe())
	public createUserPost(@Body() createPostDTO: CreatePostDTO) {
		return this.postService.createPost(createPostDTO);
	}

	@Get(':postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public getPostById(@Param('postId') postId: mongoose.Types.ObjectId) {
		return this.postService.getPostById(postId);
	}

	@Get('by-user/:userId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public getUserPostsByUserId(@Param('userId') userId: mongoose.Types.ObjectId) {
		return this.postService.getUserPostsByUserId(userId);
	}

	@Patch(':postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe(), new DTOBodyValidadtionPipe())
	public patchPostById(@Param('postId') postId: mongoose.Types.ObjectId, @Body() updatePostDTO: UpdatePostDTO) {
		return this.postService.updatePostById(postId, updatePostDTO);
	}

	@Delete(':postId')
	@UsePipes(new MongooseObjectIdParamValidationPipe())
	public deletePostById(@Param('postId') postId: mongoose.Types.ObjectId) {
		return this.postService.deletePostById(postId);
	}

}
