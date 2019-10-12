import { Types } from 'mongoose';
import { Controller, Get, Post, Param, UsePipes, Body } from '@nestjs/common';
import { IPostService } from './posts.interface';
import { MongooseObjectIdValidationPipe, DTOValidadtionPipe } from './posts.pipes';
import { CreatePostDTO } from './create-post.dto';

@Controller('posts')
export class PostsController {

	public constructor(private postService: IPostService) {}

	@Post()
	@UsePipes(new DTOValidadtionPipe())
	public createUserPost(@Body() createPostDTO: CreatePostDTO) {
		return this.postService.createPost(createPostDTO);
	}

	@Get(':postId')
	@UsePipes(new MongooseObjectIdValidationPipe())
	public getPostById(@Param('postId') postId: Types.ObjectId) {
		return this.postService.getPostById(postId);
	}

	@Get('by-user/:userId')
	@UsePipes(new MongooseObjectIdValidationPipe())
	public getUserPostsByUserId(@Param('userId') userId: Types.ObjectId) {
		return this.postService.getUserPostsByUserId(userId);
	}

}
