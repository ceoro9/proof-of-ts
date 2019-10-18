import { ModelType }              from 'typegoose';
import { Injectable, Inject }     from '@nestjs/common';
import { BaseService }            from '../posts/posts.service';
import { PostTagModel }           from './post-tags.model';
import { MongooseSessionService } from '../mongoose/session.service';

@Injectable()
export class PostTagsService extends BaseService<PostTagModel> {

	public constructor(@Inject(PostTagModel) model: ModelType<PostTagModel>,
										 private readonly mongooseSessionService: MongooseSessionService) {
		super(model);
	}

	public getSession() {
		const session = this.mongooseSessionService.getSession();
		return session ? session : null;
	}

}
