import { Typegoose } from 'typegoose';
import { MongooseResourceIdField } from './mongoose.validation';
import { PostModel } from '../posts/post.model';
import { IResourceId } from '../base/data-types/resource-id';


export class BaseModel extends Typegoose {

	public static get [Symbol.species]() {
		return this;
	}

	public getResourceField() {

		const self = this;

		return MongooseResourceIdField({
			
			findById(resourceId: IResourceId) {
				// @ts-ignore
				const ModelClass = this.constructor[Symbol.species] as Function;
				self.getModelForClass(ModelClass).findById
				
				return PostModel.findById(resourceId).exec();
			},
			
			getResourceName() {
				// @ts-ignore
				const ModelClass = this.constructor[Symbol.species] as Function;
				return ModelClass.name;
			},

		});
	}

	
}
