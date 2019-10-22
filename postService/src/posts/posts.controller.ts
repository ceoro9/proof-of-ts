import { DTOBodyValidadtionPipe }              from './posts.pipes';
import { CloseMongooseSessionInterceptor }     from './posts.interceptor';
import { MongooseObjectIdParamValidationPipe } from '../mongoose/mongoose.pipes';
import { IPostService }  from './posts.interface';
import { CreatePostDTO } from './create-post.dto';
import { UpdatePostDTO } from './update-post.dto';
import { IResourceId }   from '../base/data-types/resource-id';
import {
	Controller,
	Get, Post,
	Param, UsePipes,
	Body, Patch, Delete,
	UseInterceptors
} from '@nestjs/common';


const postId = 'postId';
const userId = 'userId';


@Controller('posts')
@UseInterceptors(CloseMongooseSessionInterceptor)
export class PostsController {

	public constructor(private postService: IPostService) {}

	@Post()
	@UsePipes(new DTOBodyValidadtionPipe())
	public createUserPost(@Body() createPostDTO: CreatePostDTO) {
		return this.postService.createPost(createPostDTO);
	}

	@Get(`:${postId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postId))
	public getPostById(@Param(postId) postId: IResourceId) {
		return this.postService.getPostById(postId);
	}

	@Get(`by-user/:${userId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(userId))
	public getUserPostsByUserId(@Param(userId) userId: IResourceId) {
		return this.postService.getUserPostsByUserId(userId);
	}

	@Patch(`:${postId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postId), new DTOBodyValidadtionPipe())
	public patchPostById(@Param(postId) postId: IResourceId, @Body() updatePostDTO: UpdatePostDTO) {
		return this.postService.updatePostById(postId, updatePostDTO);
	}

	@Delete(`:${postId}`)
	@UsePipes(new MongooseObjectIdParamValidationPipe(postId))
	public deletePostById(@Param(postId) postId: IResourceId) {
		return this.postService.deletePostById(postId);
	}

}
