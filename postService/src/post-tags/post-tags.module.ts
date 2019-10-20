import { Module }                  from '@nestjs/common';
import { ValueProvider, Provider } from '@nestjs/common/interfaces';

import { PostsModule }             from '../posts';
import { LoggerModule }            from '../logger';
import { MongooseModule }          from '../mongoose';

import { PostTagModel }            from './post-tags.model';
import { PostTagsController }      from './post-tags.controller';
import { PostTagsService }         from './post-tags.service';
import { IPostTagsService }        from './post-tags.interface';


const postTagsModelProvider: ValueProvider<typeof PostTagModel> = {
	provide:  PostTagModel,
	useValue: PostTagModel,
};


const postTagsServiceProvider: Provider<PostTagsService> = {
	provide:  IPostTagsService,
	useClass: PostTagsService,
};


@Module({
	imports: [
		PostsModule,
		MongooseModule,
		LoggerModule,
	],
	providers: [
		postTagsModelProvider,
		postTagsServiceProvider,
	],
	exports: [
		postTagsModelProvider,
		postTagsServiceProvider,
	],
	controllers: [PostTagsController],
})
export class PostTagsModule {}
