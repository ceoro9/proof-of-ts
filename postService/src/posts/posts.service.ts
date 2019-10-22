import mongoose      from 'mongoose';
import { ModelType } from 'typegoose';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { IPostService, IPostServiceSafe }        from './posts.interface';
import { PostModel }              from './post.model';
import { UserService }            from '../users/users.service';
import { UpdatePostDTO }          from './update-post.dto';
import { CreatePostDTO }          from './create-post.dto';
import { MongooseSessionService } from '../mongoose/session.service';
import { BaseModelService }       from '../base/base.service';
import { IResourceId }            from '../base/data-types/resource-id';


@Injectable()
export class PostService extends BaseModelService<PostModel> implements IPostService {

	public constructor(@Inject(PostModel) model: ModelType<PostModel>,
										 private readonly userService: UserService,
										 private readonly mongooseSessionService: MongooseSessionService) {
		super(model);
	}

	public getSession() {
		const session = this.mongooseSessionService.getSession();
		return session ? session : null;
	}

	public createPost(postData: CreatePostDTO) {
		return this.create(postData);
	}

	public getPostById(postId: IResourceId) {
		return this.findById(postId);
	}

	public updatePostById(postId: IResourceId, newData: UpdatePostDTO) {
		return this.findOneAndUpdate({ _id: postId }, newData);
	}

	public deletePostById(postId: IResourceId) {
		return this.findOneAndDelete({ _id: postId });
	}

	public async getUserPostsByUserId(userId: IResourceId) {
		await this.userService.getUserById(userId.toString());
		return this.find({ userId });
	}

	public updatePostTags(postId: IResourceId, tags: Array<string>) {
		return this.findOneAndUpdate({ _id: postId }, { tags });
	}

	public removePostTags(postId: IResourceId) {
		return this.updatePostTags(postId, []);
	}

}

@Injectable()
export class PostServiceSafe extends PostService implements IPostServiceSafe {}

/**
 * Intercepts all method calls and tries to catch
 * NotFoundException to return null instead of it. If
 * there is another type of exception - rethrows it.
 */
const postServiceSafeProxyHandler = {

	get(target: any, propKey: string, _receiver: any) {

		const originProperty = target[propKey];

		if (typeof originProperty === "function") {

			return function(this: unknown, ...args: unknown[]) {
				
				try {
					const result = originProperty.apply(this, args);
					
					// handle case, when result is a promise
					if (result instanceof Promise) {
						return new Promise(async (resolve) => {
							try {
								const promiseResult = await result;
								resolve(promiseResult);
							} catch (e) {
								if (e instanceof NotFoundException) {
									resolve(null);
									return;
								}
								throw e; // rejected
							}
						});
					}

					return result;

				} catch (e) {
					if (e instanceof NotFoundException) {
						return null;
					}
					throw e;
				}
			}
		}

		return originProperty;
	}

};

// Set proxy object on class prototype, so all method-calls
// on its instances will be intercepted by proxy object.
Object.setPrototypeOf(
	PostServiceSafe.prototype,
	new Proxy(
		Object.getPrototypeOf(PostServiceSafe.prototype), 
		postServiceSafeProxyHandler
	)
);
