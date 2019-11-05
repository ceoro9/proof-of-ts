import mongoose           from 'mongoose';
import { prop, Ref }      from '@typegoose/typegoose';
import { ResourcePolicy } from './sub.resource-policy';
import { ResourceType }   from './resource-type';

export class ResourceInstance {

	public _id!: mongoose.Types.ObjectId;

	@prop({ required: true, unique: true })
	resourceId!: string;

	@prop({ required: true, ref: ResourceType })
	typeId!: Ref<ResourceType>;

	@prop({ required: true })
	ownerId!: string;

	@prop({ required: true, _id: false })
	policy!: ResourcePolicy;
	
}
