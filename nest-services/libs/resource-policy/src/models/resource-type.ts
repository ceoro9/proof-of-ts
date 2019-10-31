import mongoose                  from 'mongoose';
import { prop, arrayProp }       from '@typegoose/typegoose';
import { IsString, ArrayUnique } from "class-validator";
import { ResourceAction }        from './sub.resource-action';


export class ResourceType {

	public _id!: mongoose.Types.ObjectId;

  @IsString()
  @prop({ required: true, unique: true })
	name!: string;

	@IsString({ each: true })
	@ArrayUnique()
	@arrayProp({ required: true, items: ResourceAction, _id: false })
	availableActions!: Array<ResourceAction>;
	
	@prop()
	get id() {
		return this._id.toHexString();
	}

}
