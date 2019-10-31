import mongoose                     from 'mongoose';
import { prop, Ref }                from '@typegoose/typegoose';
import { IsString, ValidateNested } from 'class-validator';
import { ResourcePolicy }           from './sub.resource-policy';
import { ResourceType }             from './resource-type';

export class ResourceInstance {

	public _id!: mongoose.Types.ObjectId;

	@IsString()
	@prop({ required: true, unique: true })
	resourceId!: string;

	@IsString()
	@prop({ required: true, ref: ResourceType })
	typeId!: Ref<ResourceType>;

	@IsString()
	@prop({ required: true })
	ownerId!: string;

	@ValidateNested()
	@prop({ required: true })
	policy!: ResourcePolicy;
	
	@prop()
	get id() {
		return this._id.toHexString();
	}

}
