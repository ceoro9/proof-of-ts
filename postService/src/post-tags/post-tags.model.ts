import mongoose from 'mongoose';	
import { Typegoose, prop, InstanceType, Ref } from 'typegoose';
import { Injectable } from '@nestjs/common';
import { Post }       from 'src/posts/post.model';

export class PostTag extends Typegoose {

	public _id!: mongoose.Types.ObjectId;

	@prop({ ref: Post })
	post!: Ref<Post>;
	
	@prop({ required: true, trim: true })
	name!: string;

	@prop()
	get id() {
		return this._id.toHexString();
	}

}

export const BasePostTagModel: mongoose.Model<InstanceType<PostTag>> = new PostTag().getModelForClass(PostTag, {
	existingMongoose: mongoose,
	schemaOptions: {
		collection: 'post_tags',
	},
});

export class PostTagModel extends BasePostTagModel {}
