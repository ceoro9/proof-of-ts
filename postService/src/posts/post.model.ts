import mongoose, { SaveOptions } from 'mongoose';	
import { Injectable, Inject } from '@nestjs/common';
import { Typegoose, prop, InstanceType } from 'typegoose';
import { MongooseSessionService } from '../mongoose/session.service';
import { MongooseService } from 'src/mongoose/mongoose.service';

export class Post extends Typegoose {

	public _id!: mongoose.Types.ObjectId;

	@prop({ required: true })
	userId?: mongoose.Types.ObjectId;

	@prop({ required: true })
	title?: string;

	@prop({ required: true })
	text?: string;

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

export class PostModel extends BasePostModel {

	public save(options?: SaveOptions, fn?: (err: any, product: this) => void): Promise<this>;
	public save(fn?: (err: any, product: this) => void): Promise<this>;
	public save(arg?: any, fn?: any): Promise<this> {
		console.log('ssssavveee')
		return super.save(arg, fn);
		
		// if (arg && typeof arg === 'function') {
		// 	return super.save(arg);
		// }

		// const options = arg as SaveOptions;
		// const session = this.mongooseSessionService.getSession();

		// if (!options.session) {
		// 	options.session = session;
		// }

		// const result = super.save(options, fn);

		// if (session) {
		// 	session.commitTransaction();
		// }

		// return result;
	}


}


