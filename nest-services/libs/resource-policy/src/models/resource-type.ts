import mongoose            from 'mongoose';
import { prop, arrayProp } from '@typegoose/typegoose';
import { ResourceAction }  from './sub.resource-action';


export class ResourceType {

	public _id!: mongoose.Types.ObjectId;

  @prop({ required: true, unique: true })
	name!: string;

	@arrayProp({ required: true, items: ResourceAction, _id: false })
	availableActions!: Array<ResourceAction>;

}
