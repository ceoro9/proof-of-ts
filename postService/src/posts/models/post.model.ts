import mongoose from 'mongoose';	
import { Typegoose, prop, InstanceType } from 'typegoose';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UserService } from '../../users/users.service';

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

const BasePostModel: mongoose.Model<InstanceType<Post>> = new Post().getModelForClass(Post, {
	existingMongoose: mongoose,
	schemaOptions: {
		collection: 'posts',
	},
});

@Injectable()
export class PostModel extends BasePostModel {

	@Inject()
	private userService!: UserService; // TODO: may be use constuctor injection

	public async validate() {
		super.validate();
		if (this.userId && this.userService) {
			if (!this.userService.doesUserExist(this.userId.toHexString())) {
				throw new NotFoundException('User does not exist');
			}
		} else {
			throw new Error('userId or userService is undefined');
		}
	}

}
