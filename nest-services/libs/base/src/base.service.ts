import { ClientSession, Query, SaveOptions } from 'mongoose';
import { Typegoose, ModelType }              from 'typegoose';
import { Injectable, NotFoundException }     from '@nestjs/common';
import { IResourceId }                       from './data-types/resource-id';


@Injectable()
export abstract class BaseModelService<T extends Typegoose> {

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

	public async findById(id: IResourceId) {
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
