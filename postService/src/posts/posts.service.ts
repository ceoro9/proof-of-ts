import mongoose, { ClientSession, Query, SaveOptions } from 'mongoose';
import { Typegoose, ModelType }                        from 'typegoose';
import { Injectable, NotFoundException, Inject }       from '@nestjs/common';
import { IPostService, IPostServiceSafe }              from './posts.interface';
import { PostModel }              from './post.model';
import { UserService }            from '../users/users.service';
import { UpdatePostDTO }          from './update-post.dto';
import { CreatePostDTO }          from './create-post.dto';
import { MongooseSessionService } from '../mongoose/session.service';

@Injectable()
export abstract class BaseService<T extends Typegoose> {

	protected model: ModelType<T>;

	public constructor(model: ModelType<T>) {

		const self = this;

		this.model = new Proxy(model, {

			get(target: ModelType<T> & { [key: string]: any }, propKey: string, receiver: any) {

				const originProperty = Reflect.get(target, propKey, receiver);

				if (typeof originProperty === "function") {

					return function(...args: unknown[]) {
						const result = Reflect.apply(originProperty, target, args);
						if (result instanceof Query) {
							result.session(self.getSession());
						}
						return result;
					}
				}

				return originProperty;
			}
		});
	}

	public abstract getSession(): ClientSession | null;

	public create<T>(props: T extends Array<any> ? never : T) {
		return this.model.create([props], { session: this.getSession() });
	}

	public createMany(docs: Array<any>) {
		return this.model.create(docs, { session: this.getSession() } as SaveOptions);
	}

	public find(filters: any) {
		return this.model.find(filters);
	}

	public async findById(id: mongoose.Types.ObjectId) {
		const document = await this.model.findById(id);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public async findOneAndUpdate(filter: Partial<T>, props: any) {
		const options = { new: true, context: 'query', runValidators: true } as const;
		const document = await this.model.findOneAndUpdate(filter, props, options);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public async findOneAndReplace(filter: Partial<T>, props: any) {
		const options = { new: true, overwrite: true, context: 'query', runValidators: true } as const;
		const document = await this.model.findOneAndUpdate(filter, props, options);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public async findOneAndDelete(filter: any) {
		const document = await this.model.findOneAndDelete(filter);
		if (!document) {
			throw this.getNotFoundException();
		}
		return document;
	}

	public findManyAndDelete(filter: any) {
		return this.model.deleteMany(filter);
	}

	private getNotFoundException() {
		return new NotFoundException(`${this.model.name} not found.`)
	}

}

@Injectable()
export class PostService extends BaseService<PostModel> implements IPostService {

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

	public getPostById(postId: mongoose.Types.ObjectId) {
		return this.findById(postId);
	}

	public updatePostById(postId: mongoose.Types.ObjectId, newData: UpdatePostDTO) {
		return this.findOneAndUpdate({ _id: postId }, newData);
	}

	public deletePostById(postId: mongoose.Types.ObjectId) {
		return this.findOneAndDelete({ _id: postId });
	}

	public async getUserPostsByUserId(userId: mongoose.Types.ObjectId) {
		await this.userService.getUserById(userId.toHexString());
		return this.find({ userId });
	}

	public updatePostTags(postId: mongoose.Types.ObjectId, tags: Array<string>) {
		return this.findOneAndUpdate({ _id: postId }, { tags });
	}

	public removePostTags(postId: mongoose.Types.ObjectId) {
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
