import { Module }        from '@nestjs/common';
import { ValueProvider } from '@nestjs/common/interfaces';
import { PostsModule }   from '../posts/posts.module';
import { PostTagModel }  from './post-tags.model';

const postModelProvider: ValueProvider<typeof PostTagModel> = {
	provide:  PostTagModel,
	useValue: PostTagModel,
};

@Module({
	imports:   [PostsModule],
	providers: [postModelProvider],
	exports:   [postModelProvider],
})
export class PostTagsModule {}
