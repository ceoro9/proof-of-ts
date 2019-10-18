import mongoose from 'mongoose';	
import { Injectable }                               from '@nestjs/common';
import { Typegoose, prop, InstanceType, arrayProp } from 'typegoose';

export class Post extends Typegoose {

	public _id!: mongoose.Types.ObjectId;

	@prop({ required: true })
	userId?: mongoose.Types.ObjectId;

	@prop({ required: true })
	title?: string;

	@prop({ required: true })
	text?: string;

	@arrayProp({ items: String })
	tags?: Array<string>;

	@prop()
	get id() {
		return this._id.toHexString();
	}

}

export const BasePostModel: mongoose.Model<InstanceType<Post>> = new Post().getModelForClass(Post, {
	existingMongoose: mongoose,
	schemaOptions: {
		collection: 'posts',
	},
});

@Injectable()
export class PostModel extends BasePostModel {}
