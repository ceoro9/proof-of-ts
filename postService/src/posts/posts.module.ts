import { IPostService, IPostServiceSafe } from './posts.interface';
import { Module, Provider }               from '@nestjs/common';
import { ValueProvider }                  from '@nestjs/common/interfaces';
import { PostService, PostServiceSafe }   from './posts.service';
import { PostsController }                from './posts.controller';
import { PostModel }                      from './post.model';
import { UsersModule }                    from '../users/users.module'; 
import { DoesUserWithProvidedIdExist }    from './posts.validators';
 
const postServiceProvider: Provider<PostService> = {
	provide:  IPostService,
	useClass: PostService,
}

const postServiceSafeProvider: Provider<PostServiceSafe> = {
	provide:  IPostServiceSafe,
	useClass: PostServiceSafe,
}

const postModelProvider: ValueProvider<typeof PostModel> = {
	provide:  PostModel,
	useValue: PostModel,
}

@Module({
	imports: [UsersModule],
	providers: [
		postServiceProvider,
		postServiceSafeProvider,
		postModelProvider,
		DoesUserWithProvidedIdExist,
	],
	exports: [
		postServiceProvider,
		postModelProvider,
		postServiceSafeProvider,
	],
	controllers: [PostsController],
})
export class PostsModule {}
