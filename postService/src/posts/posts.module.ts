import { IPostService, IPostServiceSafe }  from './posts.interface';
import { Module, Provider }                from '@nestjs/common';
import { ValueProvider }                   from '@nestjs/common/interfaces';
import { PostService, PostServiceSafe }    from './posts.service';
import { PostsController }                 from './posts.controller';
import { PostModel }                       from './post.model';
import { UsersModule }                     from '../users/users.module'; 
import { DoesUserWithProvidedIdExist }     from './posts.validators';
import { MongooseModule }                  from '../mongoose/mongoose.module';
import { CloseMongooseSessionInterceptor } from './posts.interceptor';
import { LoggerModule }                    from '../logger';
 
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
