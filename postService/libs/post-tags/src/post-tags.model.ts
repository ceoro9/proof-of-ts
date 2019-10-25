import mongoose from 'mongoose';	
import { Typegoose, prop, InstanceType, Ref } from 'typegoose';
import { Injectable, NotFoundException }      from '@nestjs/common';
import { PostModel } from '@post-service/posts/post.model';

export class PostTag extends Typegoose {

	public _id!: mongoose.Types.ObjectId;

	@prop({ ref: PostModel })
	post!: Ref<PostModel>;
	
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

@Injectable()
export class PostTagModel extends BasePostTagModel {}
