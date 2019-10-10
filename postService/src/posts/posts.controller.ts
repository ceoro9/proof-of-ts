import { Types } from 'mongoose';
import { Controller, Get, Post, Param, UsePipes } from '@nestjs/common';
import { IPostService } from './posts.interface';
import { MongooseObjectIdValidationPipe } from './posts.pipes';


@Controller('posts')
export class PostsController {

	public constructor(private postService: IPostService) {}

	@Post()
	public createUserPost() {
		// this.postService.createPost();
		return 'createUserPost';
	}

	@Get(':postId')
	@UsePipes(new MongooseObjectIdValidationPipe())
	public getPostById(@Param('postId') postId: Types.ObjectId) {
		console.log(postId);
		return this.postService.getPostById(postId);
	}

	@Get('by-user/:userId')
	@UsePipes(new MongooseObjectIdValidationPipe())
	public getUserPostsByUserId(@Param('userId') userId: Types.ObjectId) {
		console.log(userId);
		// return this.postService.getUserPostsByUserId(userId);
		return 'getUserPostsByUserId';
	}

}
