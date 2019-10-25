import { Module, Provider }                from '@nestjs/common';
import { ValueProvider }                   from '@nestjs/common/interfaces';

import { UsersModule }                     from '@post-service/users';
import { LoggerModule }                    from '@post-service/logger';
import { MongooseModule }                  from '@post-service/mongoose';

import { PostService, PostServiceSafe }    from './posts.service';
import { PostsController }                 from './posts.controller';
import { PostModel }                       from './post.model';
import { DoesUserWithProvidedIdExist }     from './posts.validators';
import { CloseMongooseSessionInterceptor } from './posts.interceptor';
import { IPostService, IPostServiceSafe }  from './posts.interface';


const postServiceProvider: Provider<PostService> = {
	provide:  IPostService,
	useClass: PostService,
};


const postServiceSafeProvider: Provider<PostServiceSafe> = {
	provide:  IPostServiceSafe,
	useClass: PostServiceSafe,
};


const postModelProvider: ValueProvider<typeof PostModel> = {
	provide:  PostModel,
	useValue: PostModel,
};


@Module({
	imports: [
		UsersModule,
		MongooseModule,
		LoggerModule,
	],
	providers: [
		postServiceProvider,
		postServiceSafeProvider,
		postModelProvider,
		DoesUserWithProvidedIdExist,
		CloseMongooseSessionInterceptor,
	],
	exports: [
		postServiceProvider,
		postModelProvider,
		postServiceSafeProvider,
		CloseMongooseSessionInterceptor,
	],
	controllers: [PostsController],
})
export class PostsModule {}
