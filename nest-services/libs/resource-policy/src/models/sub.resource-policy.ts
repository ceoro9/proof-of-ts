import { arrayProp }               from '@typegoose/typegoose';
import { IsArray, ValidateNested } from 'class-validator';
import { ResourcePolicyDocument }  from './sub.resource-policy-document';


export class ResourcePolicy {
	
	@IsArray()
	@ValidateNested({ each: true })
	@arrayProp({ required: true, items: ResourcePolicyDocument, _id: false })
	documents!: Array<ResourcePolicyDocument>;

}
