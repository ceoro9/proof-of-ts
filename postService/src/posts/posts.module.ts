import { Module, Provider } from '@nestjs/common';
import { ValueProvider }    from '@nestjs/common/interfaces';
import { PostService }      from './post.service';
import { IPostService }     from './posts.interface';
import { PostsController }  from './posts.controller';
import { PostModel }        from './models/post.model';
import { UsersModule }      from '../users/users.module'; 
 
const postServiceProvider: Provider<PostService> = {
	provide:  IPostService,
	useClass: PostService,
}

const postModelProvider: ValueProvider<typeof PostModel> = {
	provide:  PostModel,
	useValue: PostModel,
}

@Module({
	imports:     [UsersModule],
	providers:   [postServiceProvider, postModelProvider],
	exports:     [postServiceProvider, postModelProvider],
	controllers: [PostsController],
})
export class PostsModule {}
