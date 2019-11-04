import mongoose                  								 from 'mongoose';
import { prop, arrayProp }       								 from '@typegoose/typegoose';
import { IsString, ArrayUnique, ValidateNested } from 'class-validator';
import { ResourceAction }        								 from './sub.resource-action';


export class ResourceType {

	public _id!: mongoose.Types.ObjectId;

  @IsString()
  @prop({ required: true, unique: true })
	name!: string;

	@ArrayUnique()
	@ValidateNested({ each: true })
	@arrayProp({ required: true, items: ResourceAction, _id: false })
	availableActions!: Array<ResourceAction>;

}
